import { UsersRepository } from './users.repository';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
    private logger: Logger = new Logger('UsersService');
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly userRepository: UsersRepository) {}

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
        const cacheUser: User = await this.cacheManager.get(id);
        if (cacheUser) {
            this.logger.debug(`User found in cache: ${cacheUser.pseudo}`);
            return cacheUser;
        }
        const user = await this.userRepository.findOne({ _id: id });
        await this.cacheManager.set(user._id.toString(), user, { ttl: 60 });
        this.logger.debug(`User store in cache: ${user.pseudo}`);
        return user;
    }

    async storeAccessToken(userId: string, token: string): Promise<void> {
        await this.cacheManager.del(userId);
        try {
            await this.userRepository.update(userId, { accessToken: token });
        } catch (e) {
            this.logger.error(`StoreAccessToken error with user: ${userId}, and token: ${token}`);
            throw e;
        }
    }

    async removeAccessToken(userId: string): Promise<void> {
        await this.cacheManager.del(userId);
        try {
            await this.userRepository.update(userId, { accessToken: null });
        } catch (e) {
            this.logger.error(`RemoveAccessToken error with user: ${userId}`);
            throw e;
        }
    }

    private async isUserExist(email: string, pseudo: string) {
        try {
            const existingUser = await this.userRepository.findOne({ $or: [{ email }, { pseudo }] });
            if (existingUser) return true;
        } catch (e) {
            return false;
        }
    }
}
