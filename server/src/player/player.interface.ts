export interface ICoordinates {
    x: number;
    y: number;
    z: number;
}
export interface IEuler {
    _x: number;
    _y: number;
    _z: number;
}

export interface IPlayer {
    id: string;
    model: TModel;
    animation: TAnimation;
    position: ICoordinates;
    rotation: ICoordinates;
    username: string;
}

export type TModel = 'Alien';

export type TAnimation = 'walk' | 'idle' | 'run' | 'jump';
