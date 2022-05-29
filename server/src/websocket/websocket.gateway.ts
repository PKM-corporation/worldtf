import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/player/player.class';
import {
    IClientEmitError,
    IClientEmitPlayer,
    IClientEmitPlayers,
    IClientEmitWarning,
    IWebsocketAnimData,
    IWebsocketChatData,
    IWebsocketCommandData,
    IWebsocketConnectionLog,
    IWebsocketConnectionOptions,
    IWebsocketData,
    IWebsocketModelChoiceData,
    IWebsocketMoveData,
    IWebsocketRotateData,
} from './websocket.interface';
import { WebsocketService } from './websocket.service';
import { DateTime } from 'luxon';
import { User } from 'src/db/schemas/users.schema';
import { SanctionsService } from 'src/sanctions/sanctions.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('WebsocketGateway');
    private players: Map<string, Player> = new Map();

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private websocketService: WebsocketService,
        private authService: AuthService,
        private sanctionsService: SanctionsService,
        private usersService: UsersService,
    ) {}

    afterInit() {
        this.websocketService.init(this.wss);
        this.logger.log(`websocket server initialized`);
    }
    async handleConnection(client: Socket) {
        const user = (await this.authService.checkIfAccessTokenValid(client.handshake.auth.token, true)) as User;
        if (!user) {
            this.logger.warn(`Client ${client.id} tries to login with invalid token ${client.handshake.auth.token}`);
            client.emit(WebsocketEvent.Error, { type: 'IncorrectToken', status: 401 } as IClientEmitError);
            return client.disconnect();
        }
        if (this.findPlayerByPseudo(user.pseudo)) {
            this.logger.warn(`Client ${client.id} tries to login with user ${user.pseudo} who is already logged in`);
            client.emit(WebsocketEvent.Error, { type: 'AlreadyLogin', status: 409 } as IClientEmitError);
            return client.disconnect();
        }
        const sanction = await this.sanctionsService.getUserBannedOrKickedSanction(user._id.toString());
        if (sanction) {
            this.logger.warn(`User ${user.pseudo} is kicked or banned and tries to login`);
            const admin = await this.usersService.findUserById(sanction.adminId);
            client.emit(WebsocketEvent.Error, {
                type: this.websocketService.getErrorTypeBySanctionType(sanction.type),
                duration: sanction.duration,
                day: DateTime.fromSeconds(sanction.date).toLocaleString(DateTime.DATE_SHORT),
                time: DateTime.fromSeconds(sanction.date).toFormat('HH:mm'),
                sender: admin.pseudo,
            } as IClientEmitError);
            return client.disconnect();
        }

        const options = client.handshake.query as IWebsocketConnectionOptions;
        const players = Array.from(this.players.values());
        const player = new Player(
            user._id.toString(),
            client.id,
            user.role,
            user.pseudo,
            options.model,
            options.position ? JSON.parse(options.position) : null,
            options.rotation ? JSON.parse(options.rotation) : null,
        );

        client.emit(WebsocketEvent.Players, { type: 'InitPlayers', players } as IClientEmitPlayers);
        this.players.set(client.id, player);

        const newPlayer: IClientEmitPlayer = { type: 'AddPlayer', id: player.id, player };
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(client.id), WebsocketEvent.Players, newPlayer);

        this.wss.emit(WebsocketEvent.Logs, {
            type: 'Connection',
            id: player.id,
            pseudo: user.pseudo,
            date: DateTime.now().toFormat('HH:mm'),
        } as IWebsocketConnectionLog);
        this.logger.log(`client ${client.id}, pseudo: ${user.pseudo} connected`);
    }
    handleDisconnect(client: Socket) {
        const player = this.players.get(client.id);
        if (!player) return;

        const removedPlayer: IClientEmitPlayer = { type: 'RemovePlayer', id: player.id, player };
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(client.id), WebsocketEvent.Players, removedPlayer);
        this.players.delete(client.id);

        this.wss.emit(WebsocketEvent.Logs, {
            type: 'Disconnection',
            id: player.id,
            pseudo: player.username,
            date: DateTime.now().toFormat('HH:mm'),
        } as IWebsocketConnectionLog);
        this.logger.log(`client ${client.id} disconnected`);
    }

    //@UseGuards(JwtAuthGuard)
    @SubscribeMessage(WebsocketEvent.PlayerAction)
    handleEventPlayerAction(@MessageBody() data: IWebsocketData, @ConnectedSocket() client: Socket) {
        const player = this.players.get(client.id);
        if (!player) {
            return this.logger.warn(`Player not found, client: ${client.id}`);
        }
        switch (data.type) {
            case 'Move':
                const moveData = data as IWebsocketMoveData;
                this.websocketService.move(moveData.position, player);
                break;
            case 'Rotate':
                const rotateData = data as IWebsocketRotateData;
                this.websocketService.rotate(rotateData.rotation, player);
                break;
            case 'Anim':
                const animData = data as IWebsocketAnimData;
                this.websocketService.anim(animData.animation, player);
                break;
            case 'ModelChoice':
                const modelData = data as IWebsocketModelChoiceData;
                this.websocketService.modelChoice(modelData.model, player);
                break;
            default:
                this.logger.warn(`Unknown websocket data type: ${data.type}`);
                break;
        }
    }
    //@UseGuards(JwtAuthGuard)
    @SubscribeMessage(WebsocketEvent.Chat)
    async handleEventChat(@MessageBody() data: IWebsocketChatData, @ConnectedSocket() client: Socket) {
        const player = this.players.get(client.id);
        if (!player) {
            return this.logger.warn(`Player not found, client: ${client.id}`);
        }
        const cachedClient = await this.cacheManager.get(client.id);
        if (cachedClient) {
            return client.emit(WebsocketEvent.Warning, 'please do not spam');
        } else {
            await this.cacheManager.set(client.id, client, { ttl: 0.5 });
        }
        if (!/^#([0-9a-f]{6})$/i.test(data.color)) {
            this.logger.warn(`Incorrect hex color in message chat user: ${player.username}, color: ${data.color}`);
            data.color = '#000000';
        }
        this.logger.verbose(`[${player.username}]: ${data.message}`);
        this.websocketService.chat(data.message, data.color, player);
    }

    //@UseGuards(JwtAuthGuard)
    @SubscribeMessage(WebsocketEvent.Command)
    async handleEventCommand(@MessageBody() data: IWebsocketCommandData, @ConnectedSocket() client: Socket) {
        const player = this.players.get(client.id);
        if (!player) {
            return this.logger.warn(`Player not found, client: ${client.id}`);
        }
        const cachedClient = await this.cacheManager.get(client.id);
        if (cachedClient) {
            return client.emit(WebsocketEvent.Warning, { type: 'Spam' } as IClientEmitWarning);
        } else {
            await this.cacheManager.set(client.id, client, { ttl: 0.5 });
        }
        const command = this.websocketService.splitCommand(data.command);
        this.logger.debug(`[${player.username}]: /${command.type}: target: ${command.target}, content: ${command.content}`);
        const target = this.findPlayerByPseudo(command.target);
        switch (command.type) {
            case 'mp':
                if (target) {
                    this.websocketService.sendMpTo(target, command.content, client, player);
                } else {
                    this.logger.warn(`${player.username} type ${command.type} command with incorrect target: ${command.target}`);
                    client.emit(WebsocketEvent.Warning, { type: 'IncorrectTarget' } as IClientEmitWarning);
                }
                break;
            case 'tp':
                if (target) {
                    this.websocketService.tpTo(target, player, client);
                } else {
                    this.logger.warn(`${player.username} type ${command.type} command with incorrect target: ${command.target}`);
                    client.emit(WebsocketEvent.Warning, { type: 'IncorrectTarget' } as IClientEmitWarning);
                }
                break;
            case 'kick':
                await this.websocketService.sanctionUser(command.target, player, 'Kick', {
                    message: command.content,
                    time: command.time,
                    targetPlayer: target,
                });
                break;
            case 'ban':
                await this.websocketService.sanctionUser(command.target, player, 'Ban', {
                    message: command.content,
                    targetPlayer: target,
                });
                break;
            case 'mute':
                await this.websocketService.sanctionUser(command.target, player, 'Mute', {
                    message: command.content,
                    time: command.time,
                    targetPlayer: target,
                });
                break;
            case 'cancel':
                await this.websocketService.cancelUserSanction(command.target, player, command.sanctionType);
                break;
            case 'help':
                this.websocketService.askHelp(client);
                break;
        }
    }

    private findPlayerByPseudo(pseudo: string): Player {
        return Array.from(this.players.values()).find((player) => player.username === pseudo);
    }
}
