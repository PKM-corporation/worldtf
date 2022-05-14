import { ParsedUrlQuery } from 'querystring';
import { Entity } from 'src/classes/Entity.class';
import { Player } from 'src/classes/Player.class';
import { ICoordinates, IEuler, TAnimation, TPlayerModel } from 'src/classes/player.interface';
import { Vector3 } from 'three';

export type TWebsocketDataType =
    | 'Chat'
    | 'Move'
    | 'ModelChoice'
    | 'Anim'
    | 'RemovePlayer'
    | 'AddPlayer'
    | 'InitPlayers'
    | 'InitEntities'
    | 'AddEntity'
    | 'RemoveEntity';

export interface IWebsocketData {
    type: TWebsocketDataType;
}
export interface IWebsocketDataEntities extends IWebsocketData {
    id: string;
}
export interface IWebsocketMoveDataEntity extends IWebsocketDataEntities {
    position: Vector3;
    rotation: IEuler;
}
export interface IWebsocketMoveData extends IWebsocketData {
    position: Vector3;
    rotation: IEuler;
}
export interface IWebsocketAnimData extends IWebsocketData {
    animation: TAnimation;
}
export interface IWebsocketModelChoiceData extends IWebsocketData {
    model: TPlayerModel;
}
export interface IWebsocketChatData extends IWebsocketData {
    message: string;
}

export interface IWebsocketConnectionOptions extends ParsedUrlQuery {
    userId: string;
    position: string;
    rotation: string;
    model: TPlayerModel;
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
export interface IClientEmitEntities extends IClientEmitData {
    entities: Entity[];
}
export interface IClientEmitPosition extends IClientEmitData {
    position: ICoordinates;
    rotation: ICoordinates;
}
export interface IClientEmitAnimation extends IClientEmitData {
    animation: TAnimation;
}
export interface IClientEmitModel extends IClientEmitData {
    model: TPlayerModel;
}
export interface IClientEmitMessage extends IClientEmitData {
    message: string;
}
