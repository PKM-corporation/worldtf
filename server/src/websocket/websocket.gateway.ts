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
import { Player } from 'src/classes/Player.class';
import {
    IClientEmitEntities,
    IClientEmitPlayer,
    IClientEmitPlayers,
    IWebsocketAnimData,
    IWebsocketChatData,
    IWebsocketConnectionOptions,
    IWebsocketData,
    IWebsocketDataEntities,
    IWebsocketModelChoiceData,
    IWebsocketMoveData,
    IWebsocketMoveDataEntity,
} from './websocket.interface';
import { WebsocketService } from './websocket.service';
import { Entity } from 'src/classes/Entity.class';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('WebsocketGateway');
    private players: Map<string, Player> = new Map();
    private entities: Map<string, Entity> = new Map();

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private websocketService: WebsocketService, private authService: AuthService) {}

    afterInit() {
        this.websocketService.init(this.wss);
        this.logger.log(`websocket server initialized`);
    }
    async handleConnection(client: Socket) {
        const user = await this.authService.validateUserWithToken(client.handshake.auth.token);
        if (!user || Object.values(client.handshake.query).length === 0) return client.disconnect();

        const options = client.handshake.query as IWebsocketConnectionOptions;
        const players = Array.from(this.players.values());
        const entities = Array.from(this.entities.values());
        const player = new Player(
            client.id,
            user.pseudo,
            options.model,
            options.position ? JSON.parse(options.position) : null,
            options.rotation ? JSON.parse(options.rotation) : null,
        );

        client.emit(WebsocketEvent.Entities, { type: 'InitEntities', entities } as IClientEmitEntities);
        client.emit(WebsocketEvent.Players, { type: 'InitPlayers', players } as IClientEmitPlayers);
        this.players.set(client.id, player);

        const newPlayer: IClientEmitPlayer = { type: 'AddPlayer', id: client.id, player };
        this.websocketService.emit(this.websocketService.getClientsWithoutOne(client.id), WebsocketEvent.Players, newPlayer);

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

        this.logger.log(`client ${client.id} disconnected`);
    }

    @SubscribeMessage(WebsocketEvent.EntityAction)
    handleEventEntityAction(@MessageBody() data: IWebsocketDataEntities) {
        const entity = this.entities.get(data.id);
        if (!entity) {
            return this.logger.warn(`Entity not exist, id: ${data.id}`);
        }
        switch (data.type) {
            case 'Move':
                const moveData = data as IWebsocketMoveDataEntity;
                this.websocketService.move(moveData.position, moveData.rotation, entity);
                break;
            default:
                this.logger.warn(`Unknown websocket data type: ${data.type}`);
                break;
        }
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
                this.websocketService.move(moveData.position, moveData.rotation, player);
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
        this.websocketService.chat(data.message, player);
    }
}
