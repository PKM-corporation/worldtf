import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/users.schema';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    private logger: Logger = new Logger('AuthService');
    constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {}

    async validateUser(login: string, password: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ $or: [{ email: login }, { pseudo: login }] });
            const match = await bcrypt.compare(password, user.password);
            if (user && match) {
                this.logger.debug(`User Login: ${login}`);
                return user;
            }
        } catch (error) {
            this.logger.debug(`User not found: ${login}`);
        }
    }

    async login(user: User) {
        const payload = { username: user.pseudo, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
