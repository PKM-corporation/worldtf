import { HttpStatus } from '@nestjs/common';
import { ParsedUrlQuery } from 'querystring';
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
    | 'Error';

export type TWarning = 'Spam' | 'IncorrectTarget';

export type TWebsocketLog = 'Connection' | 'Disconnection';

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
    type: TWarning;
}
export interface IClientEmitError extends IClientEmitData {
    status: HttpStatus;
    message: string;
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
export interface IClientEmitMessage extends IClientEmitData {
    message: string;
    date: string;
}
export interface IClientEmitChatMessage extends IClientEmitMessage {
    color: string;
}

export interface IWebsocketLog {
    id: string;
    type: TWebsocketLog;
    date: string;
}

export interface IWebsocketConnectionLog extends IWebsocketLog {
    pseudo: string;
}

export type TCommand = 'mp' | 'tp' | 'help';
export interface ICommand {
    type: TCommand;
    target?: string;
    content?: string;
}
