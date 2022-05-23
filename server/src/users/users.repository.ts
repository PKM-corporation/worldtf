import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return await this.userModel.findOne(userFilterQuery);
    }
    async findAll(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return await this.userModel.find(userFilterQuery);
    }
    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
    async update(userId: string, userUpdateQuery: UpdateQuery<UserDocument>): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, userUpdateQuery);
    }
}
