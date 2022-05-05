import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
    imports: [],
    providers: [WebsocketService, WebsocketGateway],
})
export class WebsocketModule {}
