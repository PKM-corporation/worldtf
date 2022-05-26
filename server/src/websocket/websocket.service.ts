import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SanctionErrorMessages, WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/player/player.class';
import { ICoordinates, TAnimation, TModel } from 'src/player/player.interface';
import { Vector3 } from 'three';
import {
    IClientEmitPosition,
    IClientEmitMessage,
    IClientEmitModel,
    IClientEmitData,
    IClientEmitAnimation,
    ICommand,
    IClientEmitRotation,
    IClientEmitChatMessage,
    IClientEmitError,
    ISanctionCommandOptions,
    TWebsocketError,
    IClientEmitWarning,
} from './websocket.interface';
import { DateTime } from 'luxon';
import { UsersService } from 'src/users/users.service';
import { Cache } from 'cache-manager';
import { SanctionsService } from 'src/sanctions/sanctions.service';
import { TSanction } from 'src/db/db.interface';

@Injectable()
export class WebsocketService {
    private server: Server;
    private logger: Logger = new Logger('WebsocketService');

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private usersService: UsersService, private sanctionsService: SanctionsService) {}

    init(server: Server) {
        this.server = server;
    }

    move(position: Vector3 | ICoordinates, player: Player) {
        player.move(position);
        const playerPosition: IClientEmitPosition = {
            type: 'Move',
            id: player.id,
            position: player.position,
        };
        const clients = this.getClientsWithoutOne(player.clientId);
        this.emit(clients, WebsocketEvent.PlayerAction, playerPosition);
    }
    rotate(rotation: ICoordinates, player: Player) {
        player.rotate(rotation);
        const playerPosition: IClientEmitRotation = {
            type: 'Rotate',
            id: player.id,
            rotation: player.rotation,
        };
        const clients = this.getClientsWithoutOne(player.clientId);
        this.emit(clients, WebsocketEvent.PlayerAction, playerPosition);
    }

    anim(animation: TAnimation, player: Player) {
        player.animation = animation;
        const playerAnimation: IClientEmitAnimation = {
            type: 'Anim',
            id: player.id,
            animation: animation,
        };
        const clients = this.getClientsWithoutOne(player.clientId);
        this.emit(clients, WebsocketEvent.PlayerAction, playerAnimation);
    }

    modelChoice(model: TModel, player: Player) {
        player.model = model;
        const playerModel: IClientEmitModel = {
            id: player.id,
            type: 'ModelChoice',
            model,
        };
        const clients = this.getClientsWithoutOne(player.clientId);
        this.emit(clients, WebsocketEvent.PlayerAction, playerModel);
    }

    chat(message: string, color: string, player: Player) {
        const playerMessage: IClientEmitChatMessage = {
            type: 'Chat',
            id: player.username,
            message: message,
            role: player.role,
            color: player.role === 'Admin' ? '#FF0000' : color,
            date: DateTime.now().toFormat('HH:mm'),
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
                        content: splittedCommand.splice(2, splittedCommand.length).join(' '),
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
            case '/kick':
            case '/mute':
                if (splittedCommand[1]) {
                    const timeout = Number.isInteger(Number(splittedCommand[2])) ? Number(splittedCommand[2]) : null;
                    const contentIndex = timeout === null ? 2 : 3;
                    return {
                        type: splittedCommand[0] === '/mute' ? 'mute' : 'kick',
                        target: splittedCommand[1],
                        time: timeout,
                        content: splittedCommand[contentIndex] ? splittedCommand.splice(contentIndex, splittedCommand.length).join(' ') : null,
                    } as ICommand;
                }
                break;
            case '/ban':
                if (splittedCommand[1]) {
                    return {
                        type: 'ban',
                        target: splittedCommand[1],
                        content: splittedCommand[2] ? splittedCommand.splice(2, splittedCommand.length).join(' ') : null,
                    } as ICommand;
                }
                break;
        }
        return {
            type: 'help',
        } as ICommand;
    }

    sendMpTo(target: Player, message: string, client: Socket, player: Player) {
        const clientTarget = this.getClientById(target.clientId);
        const mp: IClientEmitMessage = {
            type: 'Mp',
            id: player.username,
            message,
            date: DateTime.now().toFormat('HH:mm'),
        };
        if (clientTarget) {
            clientTarget.emit(WebsocketEvent.Chat, mp);
            client.emit(WebsocketEvent.Chat, mp);
        }
    }

    tpTo(target: Player, player: Player, client: Socket) {
        const positionData: IClientEmitPosition = {
            type: 'Tp',
            position: target.position,
        };
        client.emit(WebsocketEvent.PlayerAction, positionData);
        this.move(target.position, player);
    }

    askHelp(client: Socket) {
        const playerData: IClientEmitData = { type: 'Help' };
        client.emit(WebsocketEvent.Chat, playerData);
    }

    async sanctionUser(pseudo: string, admin: Player, type: TSanction, options?: ISanctionCommandOptions) {
        const user = await this.usersService.findUserById(admin.id);
        const target = await this.usersService.findUserByPseudo(pseudo);
        const clientAdmin = this.getClientById(admin.clientId);
        if (user?.role !== 'Admin') {
            clientAdmin.emit(WebsocketEvent.Warning, { type: 'InsufficientRights' } as IClientEmitWarning);
            this.logger.warn(`User ${admin.id} (${user.pseudo}) tries to ${type} ${target?._id?.toString()} (${target.pseudo}) but isn't admin`);
            return;
        }
        if (!target) {
            clientAdmin.emit(WebsocketEvent.Warning, { type: 'IncorrectTarget' } as IClientEmitWarning);
            this.logger.warn(`Sanction ${type} by ${user._id.toString()} (${user.pseudo}) with incorrect target: ${pseudo}`);
            return;
        }

        const clientTarget = this.getClientById(options?.targetPlayer?.clientId);
        if (clientTarget) {
            switch (type) {
                case 'Ban':
                case 'Kick':
                    const data: IClientEmitError = {
                        type: this.getErrorTypeBySanctionType(type),
                        sender: user.pseudo,
                        message: options.message,
                        duration: options.time,
                    };
                    clientTarget.emit(WebsocketEvent.Error, data);
                    clientTarget.disconnect();
                    break;
                case 'Mute':
                    clientAdmin.emit(WebsocketEvent.Warning, { type: 'Muted' } as IClientEmitWarning);
                    break;
            }
        }
        try {
            await this.sanctionsService.newSanction(target._id.toString(), type, user._id.toString(), {
                duration: options.time,
                reason: options.message,
            });
        } catch (e) {
            if (e.message !== SanctionErrorMessages.UserAlreadySanctioned) {
                this.logger.error(`sanctionUser failed with user: ${target._id.toString} (${target.pseudo})`);
                throw e;
            }
        }
    }

    getErrorTypeBySanctionType(type: TSanction): TWebsocketError {
        switch (type) {
            case 'Kick':
                return 'Kicked';
            case 'Ban':
                return 'Banned';
        }
    }
}
