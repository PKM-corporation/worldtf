import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';
import { DbModule as DatabaseModule } from './db/db.module';
import { SanctionsModule } from './sanctions/sanctions.module';

const configOptions = {
    isGlobal: true,
    ignoreEnvFile: false,
    envFilePath: '.env',
};

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        DatabaseModule,
        AuthModule,
        SanctionsModule,
        UsersModule,
        WebsocketModule,
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_PROJECT}`),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
