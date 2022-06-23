import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SanctionErrorMessages, WebsocketEvent } from 'src/common/constant';
import { Player } from 'src/player/player.class';
import { ICoordinates, TAnimation, TModel } from 'src/player/player.interface';
import { Vector3 } from 'three';
import {
    IClientEmitPosition,
    IClientEmitModel,
    IClientEmitData,
    IClientEmitAnimation,
    ICommand,
    IClientEmitRotation,
    IClientEmitError,
    ISanctionCommandOptions,
    TWebsocketError,
    IWebsocketChat,
    IWebsocketMp,
    IWebsocketVerbose,
    IWebsocketWarning,
    IWebsocketLog,
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
        const playerMessage: IWebsocketChat = {
            sender: player.username,
            type: 'Chat',
            content: message,
            role: player.role,
            color: player.role === 'Admin' ? '#FF0000' : color,
            date: DateTime.now().toFormat('HH:mm'),
        };
        this.server.emit(WebsocketEvent.Message, playerMessage);
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
            case '/cancel':
                if (splittedCommand[1] && splittedCommand[2]) {
                    const sanctionType = this.convertSanctionTypeFromCommandToTSanction(splittedCommand[1]);
                    if (!sanctionType) break;
                    return {
                        type: 'cancel',
                        sanctionType,
                        target: splittedCommand[2],
                    } as ICommand;
                }
                break;
        }
        return {
            type: 'help',
        } as ICommand;
    }

    convertSanctionTypeFromCommandToTSanction(type: string): TSanction {
        switch (type.toLowerCase()) {
            case 'ban':
                return 'Ban';
            case 'kick':
                return 'Kick';
            case 'mute':
                return 'Mute';
        }
    }

    sendMpTo(target: Player, message: string, client: Socket, player: Player) {
        const clientTarget = this.getClientById(target.clientId);
        const mp: IWebsocketMp = {
            type: 'Mp',
            sender: player.username,
            content: message,
            date: DateTime.now().toFormat('HH:mm'),
        };
        if (clientTarget) {
            clientTarget.emit(WebsocketEvent.Message, mp);
            client.emit(WebsocketEvent.Message, mp);
        }
    }

    tpTo(target: Player, player: Player, client: Socket) {
        const positionData: IClientEmitPosition = {
            type: 'Tp',
            position: target.position,
        };
        client.emit(WebsocketEvent.PlayerAction, positionData);
        this.move(target.position, player);
        client.emit(WebsocketEvent.Message, { type: 'Verbose', category: 'Tp', options: { target: target.username } } as IWebsocketVerbose);
    }

    askHelp(client: Socket) {
        const playerData: IWebsocketVerbose = { type: 'Verbose', category: 'Help' };
        client.emit(WebsocketEvent.Message, playerData);
    }

    async sanctionUser(pseudo: string, admin: Player, type: TSanction, options?: ISanctionCommandOptions) {
        const user = await this.usersService.findUserById(admin.id);
        const target = await this.usersService.findUserByPseudo(pseudo);
        const clientAdmin = this.getClientById(admin.clientId);
        if (user?.role !== 'Admin') {
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'InsufficientRights' } as IWebsocketWarning);
            this.logger.warn(`User ${admin.id} (${user.pseudo}) tries to ${type} ${target?._id?.toString()} (${target.pseudo}) but isn't admin`);
            return;
        }
        if (!target) {
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'IncorrectTarget' } as IWebsocketWarning);
            this.logger.warn(`Sanction ${type} by ${user._id.toString()} (${user.pseudo}) with incorrect target: ${pseudo}`);
            return;
        }
        if (type === 'Kick' && !options?.time && !options?.targetPlayer) {
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'DisconnectedTarget' } as IWebsocketWarning);
            this.logger.warn(`Sanction ${type} by ${user._id.toString()} (${user.pseudo}) with disconnected target: ${pseudo}`);
            return;
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
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'UserAlreadySanctioned' } as IWebsocketWarning);
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
                    break;
            }
        }
        this.server.emit(WebsocketEvent.Message, {
            type: 'Log',
            category: type,
            date: DateTime.now().toFormat('HH:mm'),
            options: { target: pseudo },
        } as IWebsocketLog);
    }

    async cancelUserSanction(pseudo: string, admin: Player, type: TSanction) {
        const user = await this.usersService.findUserById(admin.id);
        const target = await this.usersService.findUserByPseudo(pseudo);

        const clientAdmin = this.getClientById(admin.clientId);
        if (user?.role !== 'Admin') {
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'InsufficientRights' } as IWebsocketWarning);
            this.logger.warn(
                `User ${admin.id} (${user.pseudo}) tries to cancel ${type} ${target?._id?.toString()} (${target.pseudo}) but isn't admin`,
            );
            return;
        }
        if (!target) {
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'IncorrectTarget' } as IWebsocketWarning);
            this.logger.warn(`Cancel sanction ${type} by ${user._id.toString()} (${user.pseudo}) with incorrect target: ${pseudo}`);
            return;
        }
        try {
            await this.sanctionsService.cancelSanction(target._id.toString(), type);
            clientAdmin.emit(WebsocketEvent.Message, {
                type: 'Verbose',
                category: 'Cancel',
                options: { target: pseudo, sanction: type },
            } as IWebsocketVerbose);
        } catch (e) {
            if (e.message !== SanctionErrorMessages.UserNotSanctioned) {
                this.logger.error(`CancelSanctionUser failed with user: ${target._id.toString} (${target.pseudo})`);
                throw e;
            }
            clientAdmin.emit(WebsocketEvent.Message, { type: 'Warning', category: 'UserNotSanctioned' } as IWebsocketWarning);
            return;
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

    spam(player: Player, client: Socket) {
        player.spamCount++;
        if (player.spamCount > 3) {
            client.emit(WebsocketEvent.Error, { type: 'Kicked', message: 'Spam' } as IClientEmitError);
            return client.disconnect();
        }
        return client.emit(WebsocketEvent.Message, { type: 'Warning', category: 'Spam' } as IWebsocketWarning);
    }
}
