import { ICoordinates, TModel, TAnimation, IPlayer } from './player.interface';

export class Player {
    constructor(id: string, username: string, model?: TModel, position?: ICoordinates, rotation?: ICoordinates) {
        this.id = id;
        this.username = username;
        this.animation = 'idle';
        this.model = model ?? 'Alien';
        this.position = position ?? { x: 0, y: 0, z: 0 };
        this.rotation = rotation ?? { x: 0, y: 0, z: 0 };
    }

    private moveX(x: number) {
        this.position.x = x;
    }

    private moveY(y: number) {
        this.position.y = y;
    }

    private moveZ(z: number) {
        this.position.z = z;
    }
    private rotateX(x: number) {
        this.rotation.x = x;
    }

    private rotateY(y: number) {
        this.rotation.y = y;
    }

    private rotateZ(z: number) {
        this.rotation.z = z;
    }

    move(position: ICoordinates, rotation: ICoordinates) {
        this.moveX(position.x);
        this.moveZ(position.z);
        this.moveY(position.y);
        this.rotateX(rotation.x);
        this.rotateZ(rotation.z);
        this.rotateY(rotation.y);
    }

    toObject(): IPlayer {
        const player: IPlayer = {
            id: this.id,
            model: this.model,
            position: this.position,
            rotation: this.rotation,
            animation: this.animation,
            username: this.username,
        };
        return player;
    }

    id: string;
    position: ICoordinates;
    rotation: ICoordinates;
    username: string;
    model: TModel;
    animation: TAnimation;
}
