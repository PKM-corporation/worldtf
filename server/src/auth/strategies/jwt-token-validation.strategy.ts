import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ParsedQs } from 'qs';
import { Socket } from 'socket.io';
import { User } from 'src/db/schemas/users.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtTokenValidationStrategy extends PassportStrategy(Strategy, 'JwtTokenValidation') {
    private logger: Logger = new Logger('JwtTokenStrategy');
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> | Socket): Promise<void> {
        try {
            let user: User;

            if (this.isHttpReq(req)) {
                user = (await this.authService.checkIfAccessTokenValid(
                    this.authService.getAccessTokenFromAuthorizationHeader(req.headers.authorization),
                    true,
                )) as User;
            } else {
                user = (await this.authService.checkIfAccessTokenValid(
                    this.authService.getAccessTokenFromAuthorizationHeader(req.handshake.headers.authorization),
                    true,
                )) as User;
            }
            if (user) {
                this.success(user);
            }
            this.error(new UnauthorizedException());
        } catch (e) {
            this.logger.error(`validation token failed with error`);
            throw e;
        }
    }

    private isHttpReq(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> | Socket,
    ): req is Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        if (req['headers']) {
            return true;
        }
        return false;
    }
}
