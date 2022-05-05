import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketEvent } from 'src/common/constant';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('WebsocketGateway');

    afterInit(server: Server) {
        this.logger.log(`websocket server initialized`);
    }
    handleConnection(client: Socket) {
        this.logger.log(`client ${client.id} connected`);
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`client ${client.id} disconnected`);
    }

    @SubscribeMessage(WebsocketEvent)
    handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): WsResponse<unknown> {
        const event = WebsocketEvent;
        this.logger.log(`message received: ${data}, client: ${client.id}`);
        return { event, data };
    }
}
