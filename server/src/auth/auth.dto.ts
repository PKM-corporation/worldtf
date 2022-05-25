import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/schemas/users.schema';

export class UserAndAccessTokenDto {
    constructor(user: User, accessToken: string) {
        this.id = user._id;
        this.pseudo = user.pseudo;
        this.email = user.email;
        this.avatar = user.avatar;
        this.accessToken = accessToken;
    }
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    accessToken: string;
}

export class SignInBodyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginBodyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
