import { IApiGetUserDto } from '../interfaces/api.interface';
import { TAvatar, TRole } from '../interfaces/user.interface';

export class User {
    constructor(userDto: IApiGetUserDto, accessToken?: string) {
        this.id = userDto.id;
        this.pseudo = userDto.pseudo;
        this.email = userDto.email;
        this.role = userDto.role;
        this.avatar = userDto.avatar;
        if (accessToken) {
            this.accessToken = accessToken;
        } else if (userDto.accessToken) {
            this.accessToken = userDto.accessToken;
        } else {
            throw new Error('AccessTokenNotFound');
        }
    }
    toObject(): IUserObject {
        return {
            id: this.id,
            pseudo: this.pseudo,
            email: this.email,
            role: this.role,
            avatar: this.avatar,
            accessToken: this.accessToken,
        };
    }
    id: string;
    pseudo: string;
    email: string;
    role: TRole;
    avatar: TAvatar;
    accessToken: string;
}
export interface IUserObject {
    id: string;
    pseudo: string;
    email: string;
    role: TRole;
    avatar: TAvatar;
    accessToken: string;
}
