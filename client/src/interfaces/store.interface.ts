import { IChatObject, IMpObject, IVerboseObject, IWarningObject, ILogObject } from '../class/chat.class';
import { IPlayerObject } from '../class/player.class';
import { IUserObject } from '../class/user.class';
import { IWebsocketErrorObject } from '../class/websocket.class';
import { TAnimation } from './model.interface';
import { ICoordinates } from './player.interface';
import { TTime } from './scene.interface';

export interface IUserSlice {
    updated: number;
    data: IUserObject;
}

export interface ISetUserAction {
    payload: {
        user: IUserObject;
        isSynchronized?: boolean;
    };
}
export interface ISetBooleanAction {
    payload: boolean;
}
export interface ISetWebsocketErrorAction {
    payload: IWebsocketErrorObject;
}
export interface IStoreAction {
    payload: unknown;
}

export interface IInterfaceSlice {
    isChatting: boolean;
    showPlayerlist: boolean;
    showSettings: boolean;
    showGameMenu: boolean;
}

export interface IWebsocketSlice {
    connected: boolean;
    error: IWebsocketErrorObject;
}

export interface ISceneSlice {
    isDebug: boolean;
    time: number;
    period: TTime;
    fog: {
        color: [r: number, g: number, b: number];
        near: number;
        far: number;
    };
    loader: {
        total: number;
        progress: number;
    };
}

export interface IPlayersSlice {
    updated: number;
    ids: string[];
    data: {
        [key in string]: IPlayerObject | undefined;
    };
}

export interface IPlayersSliceNotNull {
    updated: number;
    ids: string[];
    data: {
        [key in string]: IPlayerObject;
    };
}

export interface IPlayerSlice {
    position: ICoordinates;
    rotation: ICoordinates;
    currentAnimation: TAnimation;
    sprinting: boolean;
    jump: boolean;
    falling: boolean;
    isMoveForward: boolean;
    isMoveBackward: boolean;
    isMoveLeft: boolean;
    isMoveRight: boolean;
    speed: number;
    timeToJump: number;
}

export interface IChatSlice {
    data: Array<IChatObject | IMpObject | ILogObject | IVerboseObject | IWarningObject>;
    color: string;
}

export interface IStoreStates {
    user: IUserSlice;
    interface: IInterfaceSlice;
    players: IPlayersSlice;
    player: IPlayerSlice;
    websocket: IWebsocketSlice;
    chat: IChatSlice;
    scene: ISceneSlice;
}
