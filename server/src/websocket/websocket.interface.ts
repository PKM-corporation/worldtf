import { HttpStatus } from '@nestjs/common';
import { ParsedUrlQuery } from 'querystring';
import { TRole, TSanction } from 'src/db/db.interface';
import { Player } from 'src/player/player.class';
import { ICoordinates, TAnimation, TModel } from 'src/player/player.interface';

export type TWebsocketDataType =
    | 'Chat'
    | 'Move'
    | 'Rotate'
    | 'ModelChoice'
    | 'Anim'
    | 'RemovePlayer'
    | 'AddPlayer'
    | 'InitPlayers'
    | 'Mp'
    | 'Help'
    | 'Tp'
    | 'Error'
    | 'Kick';

export type TWebsocketWarning =
    | 'Spam'
    | 'IncorrectTarget'
    | 'DisconnectedTarget'
    | 'InsufficientRights'
    | 'Muted'
    | 'UserAlreadySanctioned'
    | 'UserNotSanctioned';

export type TWebsocketLog = 'Connection' | 'Disconnection' | 'Kick' | 'Ban' | 'Mute';

export type TWebsocketVerbose = 'Tp' | 'Cancel' | 'Help';

export type TWebsocketError = 'AlreadyLogin' | 'Kicked' | 'Banned' | 'IncorrectToken';

export type TWebsocketMessage = 'Log' | 'Verbose' | 'Chat' | 'Mp' | 'Warning';

export interface IWebsocketData {
    type: TWebsocketDataType;
}
export interface IWebsocketMoveData extends IWebsocketData {
    position: ICoordinates;
}
export interface IWebsocketRotateData extends IWebsocketData {
    rotation: ICoordinates;
}
export interface IWebsocketAnimData extends IWebsocketData {
    animation: TAnimation;
}
export interface IWebsocketModelChoiceData extends IWebsocketData {
    model: TModel;
}
export interface IWebsocketChatData extends IWebsocketData {
    message: string;
    color: string;
}
export interface IWebsocketCommandData extends IWebsocketData {
    command: string;
}

export interface IWebsocketConnectionOptions extends ParsedUrlQuery {
    userId: string;
    position: string;
    rotation: string;
    model: TModel;
}

export interface IClientEmitData {
    type: TWebsocketDataType;
    id?: string;
}
export interface IClientEmitWarning {
    type: TWebsocketWarning;
}
export interface IClientEmitError {
    type: TWebsocketError;
    status?: HttpStatus;
    message?: string;
    sender?: string;
    day?: string;
    time?: string;
    // In seconds
    duration?: number;
}
export interface IClientEmitPlayer extends IClientEmitData {
    player: Player;
}
export interface IClientEmitPlayers extends IClientEmitData {
    players: Player[];
}
export interface IClientEmitPosition extends IClientEmitData {
    position: ICoordinates;
}
export interface IClientEmitRotation extends IClientEmitData {
    rotation: ICoordinates;
}
export interface IClientEmitAnimation extends IClientEmitData {
    animation: TAnimation;
}
export interface IClientEmitModel extends IClientEmitData {
    model: TModel;
}

export interface IWebsocketChat {
    sender: string;
    type: TWebsocketMessage;
    date: string;
    color: string;
    role: TRole;
    content: string;
}

export interface IWebsocketMp {
    sender: string;
    type: TWebsocketMessage;
    date: string;
    content: string;
}

export interface IWebsocketLog {
    type: TWebsocketMessage;
    category: TWebsocketLog;
    date: string;
    options?: {
        pseudo?: string;
        target?: string;
    };
}

export interface IWebsocketVerbose {
    type: TWebsocketMessage;
    category: TWebsocketVerbose;
    options?: {
        pseudo?: string;
        target?: string;
        sanction?: TSanction;
    };
}

export interface IWebsocketWarning {
    type: TWebsocketMessage;
    category: TWebsocketWarning;
}

export type TCommand = 'mp' | 'tp' | 'help' | 'kick' | 'mute' | 'ban' | 'cancel';
export interface ICommand {
    type: TCommand;
    target?: string;
    sanctionType?: TSanction;
    time?: number;
    content?: string;
}

export interface ISanctionCommandOptions {
    message?: string;
    time?: number;
    targetPlayer?: Player;
}
