import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { TRole } from 'src/db/db.interface';
import { User } from '../../db/schemas/users.schema';

export class UserDto {
    constructor(user: User) {
        this.pseudo = user.pseudo;
        this.email = user.email;
        this.avatar = user.avatar;
        this.id = user._id;
        this.role = user.role;
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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: TRole;
}
