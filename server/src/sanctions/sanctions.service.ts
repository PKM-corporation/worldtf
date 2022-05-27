import { Injectable, Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { TSanction } from 'src/db/db.interface';
import { SanctionsActivitiesRepository } from 'src/db/sanctions-activities.repository';
import { SanctionActivity } from 'src/db/schemas/sanctions-activities.schema';
import { ISanctionOptions } from './sanctions.interface';

@Injectable()
export class SanctionsService {
    private logger: Logger = new Logger('SanctionsService');
    constructor(private sanctionsActivitiesRepository: SanctionsActivitiesRepository) {}

    async newSanction(userId: string, type: TSanction, adminId: string, options?: ISanctionOptions): Promise<void> {
        if (await this.isUserSanction(userId, type)) {
            this.logger.error(`User ${userId} already sanctioned with type ${type}`);
            throw new Error('UserAlreadySanctioned');
        }
        await this.sanctionsActivitiesRepository.create({
            userId,
            type,
            adminId,
            date: DateTime.now().toUnixInteger(),
            duration: options.duration ?? 0,
            reason: options.reason,
            isActive: true,
        });
        this.logger.debug(`Sanction ${type} for user ${userId}`);
    }

    async cancelSanction(userId: string, type: TSanction): Promise<void> {
        const sanction = await this.getUserSanction(userId, type);
        if (!sanction) {
            this.logger.error(`User ${userId} not sanctioned with type ${type}`);
            throw new Error('UserNotSanctioned');
        }
        await this.sanctionsActivitiesRepository.update(sanction._id, { isActive: false });
        this.logger.debug(`Sanction ${type} cancelled for user ${userId}`);
    }

    async getUserSanction(userId: string, type: TSanction, date = DateTime.now().toUnixInteger()): Promise<SanctionActivity> {
        const sanctions = await this.sanctionsActivitiesRepository.findAll({ userId });

        for (const sanction of sanctions) {
            if (
                sanction.isActive &&
                ((type === 'Ban' && sanction.type === 'Ban') || (sanction.type === type && sanction.date + sanction.duration > date))
            ) {
                return sanction;
            }
        }
        this.logger.warn(`User ${userId} sanction not found with type ${type} and date ${date}`);
    }

    async isUserSanction(userId: string, type: TSanction, date = DateTime.now().toUnixInteger()): Promise<boolean> {
        const sanctions = await this.sanctionsActivitiesRepository.findAll({ userId });

        for (const sanction of sanctions) {
            if (
                sanction.isActive &&
                ((type === 'Ban' && sanction.type === 'Ban') ||
                    (type === 'Kick' && sanction.type === 'Ban') ||
                    (sanction.type === type && sanction.date + sanction.duration > date))
            ) {
                return true;
            }
        }
        return false;
    }

    async getUserBannedOrKickedSanction(userId: string, date = DateTime.now().toUnixInteger()): Promise<SanctionActivity> {
        const sanctions = await this.sanctionsActivitiesRepository.findAll({ userId });
        let userSanction: SanctionActivity;

        for (const sanction of sanctions) {
            if (sanction.isActive && (sanction.date + sanction.duration > date || sanction.type === 'Ban')) {
                if (sanction.type === 'Ban') {
                    return sanction;
                } else if (sanction.type === 'Kick') {
                    userSanction = sanction;
                }
            }
        }
        return userSanction;
    }
}
