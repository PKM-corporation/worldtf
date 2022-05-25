import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../schemas/users.schema';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserDto {
    constructor(user: User) {
        this.pseudo = user.pseudo;
        this.email = user.email;
        this.avatar = user.avatar;
        this.id = user._id;
    }

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    avatar: string;
}

export class AccessTokenDto {
    constructor(access_token: string) {
        this.access_token = access_token;
    }

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    access_token: string;
}
