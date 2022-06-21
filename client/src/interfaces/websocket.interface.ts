import { TLog, TMessage, TVerbose, TWarning } from './chat.interface';
import { TAnimation } from './model.interface';
import { ICoordinates } from './player.interface';
import { TAvatar, TRole, TSanction } from './user.interface';

export type TWebsocketError = 'AlreadyLogin' | 'Kicked' | 'Banned' | 'IncorrectToken';
export type TWebsocketPlayersData = 'RemovePlayer' | 'AddPlayer' | 'InitPlayers';
export type TWebsocketPlayerActionData = 'Move' | 'Rotate' | 'Anim' | 'Tp';
export type TWebsocketEvents = 'Players' | 'PlayerAction' | 'Message' | 'Command';

export interface IWebsocketDataPlayersDto {
    type: TWebsocketPlayersData;
    player?: IWebsocketPlayerDto;
    players?: IWebsocketPlayerDto[];
}
export interface IWebsocketDataPlayerActionDto {
    type: TWebsocketPlayerActionData;
    id: string;
    position?: ICoordinates;
    rotation?: ICoordinates;
    animation?: TAnimation;
}

export interface IWebsocketErrorOptions {
    sender?: string;
    day?: string;
    time?: string;
    duration?: number;
    reason?: string;
}

export interface IWebsocketErrorDto {
    type: TWebsocketError;
    status?: number;
    sender?: string;
    day?: string;
    time?: string;
    duration?: number;
    message?: string;
}

export interface IWebsocketPlayerDto {
    id: string;
    position: ICoordinates;
    rotation: ICoordinates;
    username: string;
    model: TAvatar;
    animation: TAnimation;
    clientId: string;
}

export interface IWebsocketChatDto {
    sender: string;
    type: TMessage;
    date: string;
    color: string;
    role: TRole;
    content: string;
}

export interface IWebsocketMpDto {
    sender: string;
    type: TMessage;
    date: string;
    content: string;
}

export interface IWebsocketLogDto {
    type: TMessage;
    category: TLog;
    date: string;
    options?: {
        pseudo?: string;
        target?: string;
    };
}

export interface IWebsocketVerboseDto {
    type: TMessage;
    category: TVerbose;
    options?: {
        pseudo?: string;
        target?: string;
        sanction?: TSanction;
    };
}

export interface IWebsocketWarningDto {
    type: TMessage;
    category: TWarning;
}

export interface IWebsocketEmitDataPlayerActionDto {
    type: TWebsocketPlayerActionData;
    position?: ICoordinates;
    rotation?: ICoordinates;
    animation?: TAnimation;
}
export interface IWebsocketEmitDataMessageDto {
    type: TMessage;
    message: string;
    color?: string;
}
export interface IWebsocketEmitDataCommandDto {
    type: 'Command';
    command: string;
}
