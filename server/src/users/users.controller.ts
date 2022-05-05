import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    private logger: Logger = new Logger('UsersController');

    @Get(':pseudo')
    async getUser(@Param('pseudo') pseudo: string): Promise<User> {
        return this.usersService.findUser(pseudo);
    }

    @Post()
    async createUser(@Body() CreateUserDto: createUserDto): Promise<User> {
        this.logger.debug(CreateUserDto);
        return this.usersService.createUser(CreateUserDto.pseudo, CreateUserDto.email, CreateUserDto.password);
    }

    @Get()
    async getAll(): Promise<User[]> {
        this.logger.debug('test');
        return this.usersService.findAllUsers();
    }
}
