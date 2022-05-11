import { CACHE_MANAGER, Inject, Logger, UseGuards } from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/player/player.class';
import {
    IClientEmitPlayer,
    IClientEmitPlayers,
    IWebsocketAnimData,
    IWebsocketChatData,
    IWebsocketConnectionOptions,
    IWebsocketData,
    IWebsocketModelChoiceData,
    IWebsocketMoveData,
} from './websocket.interface';
import { WebsocketService } from './websocket.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('WebsocketGateway');
    private players: Map<string, Player> = new Map();

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private websocketService: WebsocketService, private authService: AuthService) {}

    afterInit() {
        this.logger.log(`websocket server initialized`);
    }
    async handleConnection(client: Socket) {
        const user = await this.authService.validateUserWithToken(client.handshake.auth.token);
        if (!user) return client.disconnect();

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
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(this.wss, client.id), WebsocketEvent.Players, newPlayer);

        this.logger.log(`client ${client.id} connected`);
    }
    handleDisconnect(client: Socket) {
        const player = this.players.get(client.id);
        if (!player) {
            return this.logger.warn(`Player not found, client: ${client.id}`);
        }
        const removedPlayer: IClientEmitPlayer = { type: 'RemovePlayer', id: client.id, player };
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(this.wss, client.id), WebsocketEvent.Players, removedPlayer);
        this.players.delete(client.id);

        this.logger.log(`client ${client.id} disconnected`);
    }

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage(WebsocketEvent.PlayerAction)
    handleEventPlayerAction(@MessageBody() data: IWebsocketData, @ConnectedSocket() client: Socket) {
        const player = this.players.get(client.id);
        if (!player) {
            return this.logger.warn(`Player not found, client: ${client.id}`);
        }
        switch (data.type) {
            case 'Move':
                const moveData = data as IWebsocketMoveData;
                this.websocketService.move(moveData.position, moveData.rotation, player, this.wss);
                break;
            case 'Anim':
                const animData = data as IWebsocketAnimData;
                this.websocketService.anim(animData.animation, player, this.wss);
                break;
            case 'ModelChoice':
                const modelData = data as IWebsocketModelChoiceData;
                this.websocketService.modelChoice(modelData.model, player, this.wss);
                break;
            default:
                this.logger.warn(`Unknown websocket data type: ${data.type}`);
                break;
        }
    }
    @UseGuards(JwtAuthGuard)
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
        this.websocketService.chat(data.message, player, this.wss);
    }
}
