import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

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
    login: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
