import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';
import { DbModule } from './db/db.module';
import { SanctionsModule } from './sanctions/sanctions.module';

const configOptions = {
    isGlobal: true,
    ignoreEnvFile: false,
    envFilePath: '.env',
};

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        DbModule,
        AuthModule,
        SanctionsModule,
        UsersModule,
        WebsocketModule,
        MongooseModule.forRoot(process.env.MONGODB_URI),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
