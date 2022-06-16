export interface ICoordinates {
    x: number;
    y: number;
    z: number;
}

export type TAnimation =
    | 'Walking_forward'
    | 'Walking_left'
    | 'Walking_right'
    | 'Walking_backward'
    | 'Running_forward'
    | 'Running_backward'
    | 'Running_left'
    | 'Running_right'
    | 'Jumping'
    | 'Falling_idle'
    | 'Falling_to_landing'
    | 'Idle';
