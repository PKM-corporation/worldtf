import { ICoordinates, TAnimation } from '../interfaces/player.interface';
import { TAvatar } from '../interfaces/user.interface';
import { IWebsocketPlayerDto } from '../interfaces/websocket.interface';

export class Player {
    constructor(playerDto: IWebsocketPlayerDto) {
        this.id = playerDto.id;
        this.position = playerDto.position;
        this.rotation = playerDto.rotation;
        this.pseudo = playerDto.username;
        this.avatar = playerDto.model;
        this.animation = playerDto.animation;
    }

    toObject(): IPlayerObject {
        return {
            id: this.id,
            position: this.position,
            rotation: this.rotation,
            pseudo: this.pseudo,
            avatar: this.avatar,
            animation: this.animation,
        };
    }

    id: string;
    position: ICoordinates;
    rotation: ICoordinates;
    pseudo: string;
    avatar: TAvatar;
    animation: TAnimation;
}

export interface IPlayerObject {
    id: string;
    position: ICoordinates;
    rotation: ICoordinates;
    pseudo: string;
    avatar: TAvatar;
    animation: TAnimation;
}
