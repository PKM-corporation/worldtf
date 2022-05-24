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
import { User } from 'src/users/schemas/users.schema';
import {
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

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('WebsocketGateway');
    private players: Map<string, Player> = new Map();

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private websocketService: WebsocketService, private authService: AuthService) {}

    afterInit() {
        this.websocketService.init(this.wss);
        this.logger.log(`websocket server initialized`);
    }
    async handleConnection(client: Socket) {
        const user = (await this.authService.checkIfAccessTokenValid(client.handshake.auth.token, true)) as User;
        if (!user || Object.values(client.handshake.query).length === 0) return client.disconnect();
        if (this.findPlayerByPseudo(user.pseudo)) {
            this.logger.warn(`Client ${client.id} tries to login with user ${user.pseudo} who is already logged in`);
            return client.disconnect();
        }

        const options = client.handshake.query as IWebsocketConnectionOptions;
        const players = Array.from(this.players.values());
        const player = new Player(
            client.id,
            user.pseudo,
            options.model,
            options.position ? JSON.parse(options.position) : null,
            options.rotation ? JSON.parse(options.rotation) : null,
        );

        client.emit(WebsocketEvent.Players, { type: 'InitPlayers', players } as IClientEmitPlayers);
        this.players.set(client.id, player);

        const newPlayer: IClientEmitPlayer = { type: 'AddPlayer', id: client.id, player };
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(client.id), WebsocketEvent.Players, newPlayer);

        this.wss.emit(WebsocketEvent.Logs, { type: 'Connection', id: client.id, pseudo: user.pseudo } as IWebsocketConnectionLog);
        this.logger.log(`client ${client.id} connected`);
    }
    handleDisconnect(client: Socket) {
        const player = this.players.get(client.id);
        if (!player) {
            return this.logger.warn(`Suspicious attempt to connect, client: ${client.id}`);
        }
        const removedPlayer: IClientEmitPlayer = { type: 'RemovePlayer', id: client.id, player };
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(client.id), WebsocketEvent.Players, removedPlayer);
        this.players.delete(client.id);

        this.wss.emit(WebsocketEvent.Logs, { type: 'Disconnection', id: client.id, pseudo: player.username } as IWebsocketConnectionLog);
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
        this.logger.verbose(`[${player.username}]: ${data.message}`);
        this.websocketService.chat(data.message, player);
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
            case 'help':
                this.websocketService.askHelp(client);
                break;
        }
    }

    private findPlayerByPseudo(pseudo: string): Player {
        return Array.from(this.players.values()).find((player) => player.username === pseudo);
    }
}
