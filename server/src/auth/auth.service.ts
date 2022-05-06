import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/users.schema';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    private logger: Logger = new Logger('AuthService');
    constructor(private usersRepository: UsersRepository) {}

    async validateUser(login: string, password: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ $or: [{ email: login }, { pseudo: login }] });
            const match = await bcrypt.compare(password, user.password);
            if (user && match) {
                this.logger.debug(`User found: ${login}`);
                return user;
            }
        } catch (error) {
            this.logger.debug(`User not found: ${login}`);
        }
    }
}
