import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ParsedQs } from 'qs';
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
    async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<void> {
        try {
            const user = await this.authService.checkIfAccessTokenValid(
                this.authService.getAccessTokenFromAuthorizationHeader(req.headers.authorization),
                true,
            );
            if (user) {
                this.success(user);
            }
            this.error(new UnauthorizedException());
        } catch (e) {
            this.logger.error(`validation token failed with error, token: ${req.headers.authorization}`);
            throw e;
        }
    }
}
