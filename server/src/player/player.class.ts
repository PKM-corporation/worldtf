import { IPosition, TModel, TAnimation, IEncodePlayer } from './player.interface';

export class Player {
    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
        this.animation = 'idle';
        this.model = 'Alien';
        this.position = { x: 0, y: 0, z: 0 };
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

    move(x: number, z: number) {
        this.moveX(x);
        this.moveZ(z);
    }

    jump() {
        let i = 0;
        const intervalID = setInterval(() => {
            if (i >= 4) {
                this.moveY(0);
                return clearInterval(intervalID);
            }
            this.moveY(-1.25 * i ** 2 + 5 * i);
            // send Y - websocket
            i += 0.01;
        }, 1000 / 60);
    }

    encodePlayer() {
        const player: IEncodePlayer = {
            id: this.id,
            model: this.model,
            position: this.position,
            animation: this.animation,
            username: this.username,
        };
        return JSON.stringify(player);
    }

    id: string;
    position: IPosition;
    username: string;
    model: TModel;
    animation: TAnimation;
}
