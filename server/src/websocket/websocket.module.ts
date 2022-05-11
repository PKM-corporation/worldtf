import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
    imports: [CacheModule.register(), AuthModule],
    providers: [WebsocketService, WebsocketGateway],
})
export class WebsocketModule {}
