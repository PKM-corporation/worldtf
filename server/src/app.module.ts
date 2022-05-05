import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
    imports: [UsersModule, WebsocketModule, MongooseModule.forRoot('mongodb+srv://projet2Universe:Projet2!@cluster0.qi2bt.mongodb.net/Projet_2')],
    controllers: [],
    providers: [],
})
export class AppModule {}
