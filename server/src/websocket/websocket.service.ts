import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/player/player.class';
import { ICoordinates, IEuler, TAnimation, TModel } from 'src/player/player.interface';
import { Vector3 } from 'three';
import { IClientEmitPosition, IClientEmitMessage, IClientEmitModel, IClientEmitData, IClientEmitAnimation, ICommand } from './websocket.interface';

@Injectable()
export class WebsocketService {
    private server: Server;

    init(server: Server) {
        this.server = server;
    }
    move(position: Vector3 | ICoordinates, rotation: IEuler | ICoordinates, player: Player) {
        player.move(position, rotation);
        const playerPosition: IClientEmitPosition = {
            type: 'Move',
            id: player.id,
            position: player.position,
            rotation: player.rotation,
        };
        const clients = this.getClientsWithoutOne(player.id);
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

    modelChoice(model: TModel, player: Player) {
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
            id: player.username,
            message: message,
        };
        this.server.emit(WebsocketEvent.Chat, playerMessage);
    }

    emit(clients: Socket[], event: string, data: IClientEmitData) {
        for (const client of clients) {
            client.emit(event, data);
        }
    }

    getClientsWithoutOne(clientId: string): Socket[] {
        return Array.from(this.server.sockets.sockets.values()).filter((client) => client.id !== clientId);
    }

    getOnlineClients(): number {
        return Array.from(this.server.sockets.sockets.values()).length;
    }

    getClientById(clientId: string): Socket {
        return this.server.sockets.sockets.get(clientId);
    }

    //Chat commands (mp, tp, help)

    splitCommand(command: string): ICommand {
        const splittedCommand = command.split(' ');
        switch (splittedCommand[0]) {
            case '/mp':
                if (splittedCommand[1] && splittedCommand[2]) {
                    return {
                        type: 'mp',
                        target: splittedCommand[1],
                        content: splittedCommand[2],
                    } as ICommand;
                }
                break;
            case '/tp':
                if (splittedCommand[1]) {
                    return {
                        type: 'tp',
                        target: splittedCommand[1],
                    } as ICommand;
                }
                break;
        }
        return {
            type: 'help',
        } as ICommand;
    }

    sendMpTo(target: Player, message: string, client: Socket, player: Player) {
        const clientTarget = this.getClientById(target.id);
        const mp: IClientEmitMessage = {
            type: 'Mp',
            id: player.username,
            message,
        };
        if (clientTarget) {
            clientTarget.emit(WebsocketEvent.Chat, mp);
            client.emit(WebsocketEvent.Chat, mp);
        }
    }

    tpTo(target: Player, player: Player) {
        this.move(target.position, target.rotation, player);
    }

    askHelp(client: Socket) {
        const playerData: IClientEmitData = { type: 'Help', id: client.id };
        client.emit(WebsocketEvent.Chat, playerData);
    }
}
