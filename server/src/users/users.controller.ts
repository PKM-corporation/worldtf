import { Controller, Get, Post, Param, Body, Logger, HttpStatus, HttpCode, HttpException, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guards';
import { AccessTokenDto, CreateUserDto, LoginUserDto, UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private authService: AuthService) {}

    private logger: Logger = new Logger('UsersController');

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @HttpCode(HttpStatus.OK)
    async getUser(@Param('id') id: string): Promise<UserDto> {
        try {
            const user = await this.usersService.findUser(id);
            return new UserDto(user);
        } catch (e) {
            this.logger.error(`Unknown user id: ${id}, error: ${e}`);
            throw new HttpException('UnknownUserId', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('create')
    @ApiResponse({ status: HttpStatus.OK, type: AccessTokenDto })
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<AccessTokenDto> {
        try {
            const user = await this.usersService.createUser(createUserDto.pseudo, createUserDto.email, createUserDto.password, createUserDto.avatar);
            this.logger.debug(`New user ${user._id} created`);
            const { access_token } = await this.authService.generateAccessToken(user);
            await this.usersService.storeAccessToken(user._id, access_token);
            return new AccessTokenDto(access_token);
        } catch (e) {
            if (e.message === 'PseudoOrEmailAlreadyTaken') {
                this.logger.error(`Create user error, PseudoOrEmailAlreadyTaken`);
                throw new HttpException('CreateUserError', HttpStatus.CONFLICT);
            }
            this.logger.error(
                `Create user error, pseudo: ${createUserDto.pseudo}, email: ${createUserDto.email}, password: ${createUserDto.password}, avatar: ${createUserDto.avatar}, error: ${e}`,
            );
            throw new HttpException('CreateUserError', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(UserAuthGuard)
    @Post('login')
    @ApiResponse({ status: HttpStatus.OK, type: AccessTokenDto })
    @ApiBody({ type: LoginUserDto })
    @HttpCode(HttpStatus.OK)
    async login(@Request() req): Promise<AccessTokenDto> {
        const { access_token } = await this.authService.generateAccessToken(req.user);
        await this.usersService.storeAccessToken(req.user._id, access_token);
        return new AccessTokenDto(access_token);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<UserDto[]> {
        try {
            const users = await this.usersService.findAllUsers();
            const usersDto: UserDto[] = [];
            for (const user of users) {
                usersDto.push(new UserDto(user));
            }
            return usersDto;
        } catch (e) {
            this.logger.error(`FindAll error`);
            throw new HttpException('FindAllError', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
