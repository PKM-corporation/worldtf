import { UsersRepository } from './users.repository';
import { Injectable, Logger } from '@nestjs/common';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private logger: Logger = new Logger('UsersService');
    constructor(private readonly userRepository: UsersRepository) {}

    async createUser(pseudo: string, email: string, password: string): Promise<User> {
        if (await this.isUserExist(email, pseudo)) {
            throw new Error('PseudoOrEmailAlreadyTaken');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        return this.userRepository.create({
            pseudo,
            email,
            password: hashPassword,
        });
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll({});
        this.logger.debug(`${users.length} users found`);
        return users;
    }

    async findUser(id: string): Promise<User> {
        return await this.userRepository.findOne({ _id: id });
    }

    private async isUserExist(email: string, pseudo: string) {
        try {
            const existingUser = await this.userRepository.findOne({ $or: [{ email }, { pseudo }] });
            if (existingUser) return false;
        } catch (e) {
            return true;
        }
    }
}
