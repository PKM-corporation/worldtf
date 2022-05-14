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
    model: TPlayerModel;
    animation: TAnimation;
    position: ICoordinates;
    rotation: ICoordinates;
    username: string;
}

export type TPlayerModel = 'Alien';

export type TEntityModel = 'Cube' | 'Sphere';

export type TAnimation = 'walk' | 'idle' | 'run' | 'jump';
