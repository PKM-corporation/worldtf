import { TAvatar, TRole } from './user.interface';

export interface IApiGetUserDto {
    pseudo: string;
    email: string;
    id: string;
    avatar: TAvatar;
    role: TRole;
    accessToken?: string;
}
