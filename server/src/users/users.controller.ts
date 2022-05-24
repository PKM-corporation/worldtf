import { Controller, Get, Param, Logger, HttpStatus, HttpCode, HttpException, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UserDto } from './dto/users.dto';
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
            this.logger.debug(`User ${user.pseudo} found with id ${user._id}`);
            return new UserDto(user);
        } catch (e) {
            this.logger.error(`Unknown user id: ${id}, error: ${e}`);
            throw new HttpException('UnknownUserId', HttpStatus.BAD_REQUEST);
        }
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
