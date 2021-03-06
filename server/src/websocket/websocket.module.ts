import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SanctionsModule } from 'src/sanctions/sanctions.module';
import { UsersModule } from 'src/users/users.module';
import { WebsocketController } from './websocket.controller';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';

@Module({
    imports: [CacheModule.register(), AuthModule, UsersModule, SanctionsModule],
    controllers: [WebsocketController],
    providers: [WebsocketService, WebsocketGateway],
})
export class WebsocketModule {}
