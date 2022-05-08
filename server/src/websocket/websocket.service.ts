import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/player/player.class';
import { IEuler, TAnimation, TModel } from 'src/player/player.interface';
import { Vector3 } from 'three';
import { IClientEmitPosition, IClientEmitMessage, IClientEmitModel, IClientEmitData, IClientEmitAnimation } from './websocket.interface';

@Injectable()
export class WebsocketService {
    move(position: Vector3, rotation: IEuler, player: Player, server: Server) {
        player.move(position, rotation);
        const playerPosition: IClientEmitPosition = {
            type: 'Move',
            id: player.id,
            position: player.position,
            rotation: player.rotation,
        };
        const clients = this.getClientsWithoutOne(server, player.id);
        this.emit(clients, WebsocketEvent.PlayerAction, playerPosition);
    }

    anim(animation: TAnimation, player: Player, server: Server) {
        player.animation = animation;
        const playerAnimation: IClientEmitAnimation = {
            type: 'Anim',
            id: player.id,
            animation: animation,
        };
        const clients = this.getClientsWithoutOne(server, player.id);
        this.emit(clients, WebsocketEvent.PlayerAction, playerAnimation);
    }

    modelChoice(model: TModel, player: Player, server: Server) {
        player.model = model;
        const playerModel: IClientEmitModel = {
            id: player.id,
            type: 'ModelChoice',
            model,
        };
        const clients = this.getClientsWithoutOne(server, player.id);
        this.emit(clients, WebsocketEvent.PlayerAction, playerModel);
    }

    chat(message: string, player: Player, server: Server) {
        const playerMessage: IClientEmitMessage = {
            type: 'Chat',
            id: player.id,
            message: message,
        };
        server.emit(WebsocketEvent.Chat, playerMessage);
    }

    emit(clients: Socket[], event: string, data: IClientEmitData) {
        for (const client of clients) {
            client.emit(event, data);
        }
    }

    getClientsWithoutOne(server: Server, clientId: string): Socket[] {
        return Array.from(server.sockets.sockets.values()).filter((client) => client.id !== clientId);
    }
}
