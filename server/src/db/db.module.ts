import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SanctionsActivitiesRepository } from './sanctions-activities.repository';
import { SanctionActivity, SanctionActivitySchema } from './schemas/sanctions-activities.schema';
import { User, UserSchema } from './schemas/users.schema';
import { UsersRepository } from './users.repository';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: SanctionActivity.name, schema: SanctionActivitySchema },
        ]),
    ],
    providers: [UsersRepository, SanctionsActivitiesRepository],
    exports: [UsersRepository, SanctionsActivitiesRepository],
})
export class DbModule {}
