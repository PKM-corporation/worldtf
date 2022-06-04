import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { SanctionActivity, SanctionActivityDocument } from './schemas/sanctions-activities.schema';

@Injectable()
export class SanctionsActivitiesRepository {
    constructor(@InjectModel(SanctionActivity.name) private sanctionActivityModel: Model<SanctionActivityDocument>) {}
    async findOne(userFilterQuery: FilterQuery<SanctionActivity>): Promise<SanctionActivity> {
        return await this.sanctionActivityModel.findOne(userFilterQuery);
    }
    async findAll(userFilterQuery: FilterQuery<SanctionActivity>): Promise<SanctionActivity[]> {
        return await this.sanctionActivityModel.find(userFilterQuery);
    }
    async create(user: SanctionActivity): Promise<SanctionActivity> {
        const newUser = new this.sanctionActivityModel(user);
        return await newUser.save();
    }
    async update(id: string, userUpdateQuery: UpdateQuery<SanctionActivityDocument>): Promise<void> {
        await this.sanctionActivityModel.findByIdAndUpdate(id, userUpdateQuery);
    }
}
