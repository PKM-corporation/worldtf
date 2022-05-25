import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { LoginBodyDto, SignInBodyDto, UserAndAccessTokenDto } from './auth.dto';
import { IUserRequest } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { UserAuthGuard } from './guards/user-auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService, private authService: AuthService) {}

    private logger: Logger = new Logger('AuthController');

    @Post('signin')
    @ApiResponse({ status: HttpStatus.OK, type: UserAndAccessTokenDto })
    @ApiBody({ type: SignInBodyDto })
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() body: SignInBodyDto): Promise<UserAndAccessTokenDto> {
        try {
            const user = await this.usersService.createUser(body.pseudo, body.email, body.password);
            this.logger.debug(`User ${user._id}, pseudo: ${user.pseudo}, email: ${user.email} signIn`);
            const { access_token } = await this.authService.generateAccessToken(user);
            await this.usersService.storeAccessToken(user._id, access_token);
            return new UserAndAccessTokenDto(user, access_token);
        } catch (e) {
            if (e.message === 'PseudoOrEmailAlreadyTaken') {
                this.logger.error(`SignIn user error, PseudoOrEmailAlreadyTaken`);
                throw new HttpException('CreateUserError', HttpStatus.CONFLICT);
            }
            this.logger.error(`SignIn user error, pseudo: ${body.pseudo}, email: ${body.email}, password: ${body.password}, error: ${e}`);
            throw new HttpException('CreateUserError', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(UserAuthGuard)
    @Post('login')
    @ApiResponse({ status: HttpStatus.OK, type: UserAndAccessTokenDto })
    @ApiBody({ type: LoginBodyDto })
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: IUserRequest): Promise<UserAndAccessTokenDto> {
        const { access_token } = await this.authService.generateAccessToken(req.user);
        await this.usersService.storeAccessToken(req.user._id, access_token);
        this.logger.debug(`User ${req.user._id}, pseudo: ${req.user.pseudo}, email: ${req.user.email} login`);
        return new UserAndAccessTokenDto(req.user, access_token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    @ApiResponse({ status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    async logout(@Request() req: IUserRequest): Promise<void> {
        await this.usersService.removeAccessToken(req.user._id);
        this.logger.debug(`User ${req.user._id}, pseudo: ${req.user.pseudo}, email: ${req.user.email} logout`);
    }
}
