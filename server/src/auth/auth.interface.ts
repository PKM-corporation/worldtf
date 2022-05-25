import { Request } from 'express';
import { User } from 'src/users/schemas/users.schema';

export interface IUserTokenPayload {
    username: string;
    sub: string;
    exp: number;
}

export interface IUserRequest extends Request {
    user: User;
}
