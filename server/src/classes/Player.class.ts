import { Entity } from './Entity.class';
import { ICoordinates, TPlayerModel, TAnimation, IPlayer } from './player.interface';

export class Player extends Entity {
    constructor(id: string, username: string, model?: TPlayerModel, position?: ICoordinates, rotation?: ICoordinates) {
        super(id, model, position, rotation);
        this.username = username;
        this.animation = 'idle';
        this.model = model ?? 'Alien';
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

    username: string;
    model: TPlayerModel;
    animation: TAnimation;
}
