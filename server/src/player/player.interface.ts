export interface IPosition {
    x: number;
    y: number;
    z: number;
}

export interface IEncodePlayer {
    id: string;
    model: TModel;
    animation: TAnimation;
    position: IPosition;
    username: string;
}

export type TModel = 'Alien';

export type TAnimation = 'walk' | 'idle' | 'run' | 'jump';
