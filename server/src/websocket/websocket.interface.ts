import { ParsedUrlQuery } from 'querystring';
import { Player } from 'src/player/player.class';
import { ICoordinates, IEuler, TAnimation, TModel } from 'src/player/player.interface';
import { Vector3 } from 'three';

export type TWebsocketDataType = 'Chat' | 'Move' | 'ModelChoice' | 'Anim' | 'RemovePlayer' | 'AddPlayer' | 'InitPlayers';

export type TWebsocketLog = 'Connection';

export interface IWebsocketData {
    type: TWebsocketDataType;
}
export interface IWebsocketMoveData extends IWebsocketData {
    position: Vector3;
    rotation: IEuler;
}
export interface IWebsocketAnimData extends IWebsocketData {
    animation: TAnimation;
}
export interface IWebsocketModelChoiceData extends IWebsocketData {
    model: TModel;
}
export interface IWebsocketChatData extends IWebsocketData {
    message: string;
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
export interface IClientEmitPlayer extends IClientEmitData {
    player: Player;
}
export interface IClientEmitPlayers extends IClientEmitData {
    players: Player[];
}
export interface IClientEmitPosition extends IClientEmitData {
    position: ICoordinates;
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
}

export interface IWebsocketLog {
    id: string;
    type: TWebsocketLog;
}

export interface IWebsocketConnectionLog extends IWebsocketLog {
    pseudo: string;
}
