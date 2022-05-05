import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    createUser(pseudo: string, email: string, password: string): Promise<User> {
        return this.userRepository.create({
            pseudo,
            email,
            password,
        });
    }

    findAllUsers(): Promise<User[]> {
        return this.userRepository.findAll({});
    }

    findUser(pseudo: string): Promise<User> {
        return this.userRepository.findOne({ pseudo });
    }
}
