import { TRole } from 'src/db/db.interface';
import { ICoordinates, TModel, TAnimation, IPlayer } from './player.interface';

export class Player {
    constructor(id: string, clientId: string, role: TRole, username: string, model?: TModel, position?: ICoordinates, rotation?: ICoordinates) {
        this.id = id;
        this.clientId = clientId;
        this.username = username;
        this.animation = 'idle';
        this.model = model ?? 'Alien';
        this.role = role;
        this.position = position ?? { x: 0, y: 0, z: 0 };
        this.rotation = rotation ?? { x: 0, y: 0, z: 0 };
        this.spamCount = 0;
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

    move(position: ICoordinates) {
        this.moveX(position.x);
        this.moveZ(position.z);
        this.moveY(position.y);
    }

    rotate(rotation: ICoordinates) {
        this.rotateX(rotation.x);
        this.rotateY(rotation.y);
        this.rotateZ(rotation.z);
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
    role: TRole;
    clientId: string;
    spamCount: number;
}
