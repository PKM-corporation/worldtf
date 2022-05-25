import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isObject } from 'class-validator';
import jwtDecode from 'jwt-decode';
import { User } from 'src/users/schemas/users.schema';
import { UsersRepository } from 'src/users/users.repository';
import { IUserTokenPayload } from './auth.interface';

@Injectable()
export class AuthService {
    private logger: Logger = new Logger('AuthService');
    constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ $or: [{ email: login }, { pseudo: login }] });
            const match = await bcrypt.compare(password, user.password);
            if (user && match) {
                return user;
            }
        } catch (error) {
            this.logger.debug(`User not found with login ${login}`);
        }
    }

    async generateAccessToken(user: User) {
        const payload = { username: user.pseudo, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
            }),
        };
    }

    private isTokenDecoded(token: string | IUserTokenPayload): token is IUserTokenPayload {
        return isObject(token);
    }

    async validateUserWithToken(token: string | IUserTokenPayload): Promise<User> {
        if (!token) return;
        let decodedToken: IUserTokenPayload;

        try {
            if (!this.isTokenDecoded(token)) {
                decodedToken = jwtDecode(token);
            } else {
                decodedToken = token;
            }

            const user = await this.usersRepository.findOne({ pseudo: decodedToken.username, _id: decodedToken.sub });
            if (user) return user;
        } catch (e) {
            return;
        }
    }

    getAccessTokenFromAuthorizationHeader(auth: string): string {
        if (!auth.includes('Bearer')) throw new Error('IncorrectAuthorizationHeader');
        return auth.split(' ')[1];
    }

    async checkIfAccessTokenValid(accessToken: string, withUser = false): Promise<boolean | User> {
        const userWithAccessToken = await this.validateUserWithToken(accessToken);
        if (!userWithAccessToken) return false;
        if (userWithAccessToken.accessToken !== accessToken) return false;
        if (withUser) return userWithAccessToken;
        return true;
    }
}
