import { Controller, Get, Post, Param, Body, Logger, HttpStatus, HttpCode, HttpException, UseGuards, Request } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guards';
import { CreateUserDto, LoginUserDto, UserDto } from './dto/users.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    private logger: Logger = new Logger('UsersController');

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @HttpCode(HttpStatus.OK)
    async getUser(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.usersService.findUser(id);
            return user;
        } catch (e) {
            this.logger.error(`Unknown user id: ${id}, error: ${e}`);
            throw new HttpException('UnknownUserId', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('create')
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.usersService.createUser(createUserDto.pseudo, createUserDto.email, createUserDto.password);
        } catch (e) {
            this.logger.error(
                `Create user error, pseudo: ${createUserDto.pseudo}, email: ${createUserDto.email}, password: ${createUserDto.password}, error: ${e}`,
            );
            throw new HttpException('CreateUserError', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(UserAuthGuard)
    @Post('login')
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @HttpCode(HttpStatus.OK)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login(@Request() req, @Body() body: LoginUserDto) {
        return req.user;
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<User[]> {
        try {
            return await this.usersService.findAllUsers();
        } catch (e) {
            this.logger.error(`FindAll error`);
            throw new HttpException('FindAllError', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
