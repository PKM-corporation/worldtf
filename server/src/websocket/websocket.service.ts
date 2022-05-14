import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/classes/Player.class';
import { IEuler, TAnimation, TPlayerModel } from 'src/classes/player.interface';
import { Vector3 } from 'three';
import { IClientEmitPosition, IClientEmitMessage, IClientEmitModel, IClientEmitData, IClientEmitAnimation } from './websocket.interface';
import { Entity } from 'src/classes/Entity.class';
import * as crypto from 'crypto';

@Injectable()
export class WebsocketService {
    private server: Server;

    init(server: Server) {
        this.server = server;
    }
    move(position: Vector3, rotation: IEuler, entity: Player | Entity) {
        entity.move(position, rotation);
        const playerPosition: IClientEmitPosition = {
            type: 'Move',
            id: entity.id,
            position: entity.position,
            rotation: entity.rotation,
        };
        const clients = this.getClientsWithoutOne(entity.id);
        this.emit(clients, WebsocketEvent.PlayerAction, playerPosition);
    }

    anim(animation: TAnimation, player: Player) {
        player.animation = animation;
        const playerAnimation: IClientEmitAnimation = {
            type: 'Anim',
            id: player.id,
            animation: animation,
        };
        const clients = this.getClientsWithoutOne(player.id);
        this.emit(clients, WebsocketEvent.PlayerAction, playerAnimation);
    }

    modelChoice(model: TPlayerModel, player: Player) {
        player.model = model;
        const playerModel: IClientEmitModel = {
            id: player.id,
            type: 'ModelChoice',
            model,
        };
        const clients = this.getClientsWithoutOne(player.id);
        this.emit(clients, WebsocketEvent.PlayerAction, playerModel);
    }

    chat(message: string, player: Player) {
        const playerMessage: IClientEmitMessage = {
            type: 'Chat',
            id: player.id,
            message: message,
        };
        this.server.emit(WebsocketEvent.Chat, playerMessage);
    }

    emit(clients: Socket[], event: string, data: IClientEmitData) {
        for (const client of clients) {
            client.emit(event, data);
        }
    }

    initEntities(entities: Map<string, Entity>) {
        const id = crypto.randomUUID();
        entities.set(id, new Entity(id, 'Cube', { x: 10, y: 0, z: 10 }));
    }

    getClientsWithoutOne(clientId: string): Socket[] {
        return Array.from(this.server.sockets.sockets.values()).filter((client) => client.id !== clientId);
    }

    getOnlineClients(): number {
        return Array.from(this.server.sockets.sockets.values()).length;
    }
}
