import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ParsedQs } from 'qs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtTokenValidationStrategy extends PassportStrategy(Strategy, 'JwtTokenValidation') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<void> {
        try {
            await this.authService.checkTokenAndRefreshIfNecessary(this.authService.getAccessTokenFromAuthorizationHeader(req.headers.authorization));
            this.pass();
        } catch (e) {
            this.error(e);
        }
    }
}
