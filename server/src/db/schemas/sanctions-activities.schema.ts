import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TSanction } from '../db.interface';
export type SanctionActivityDocument = SanctionActivity & Document;

@Schema()
export class SanctionActivity {
    _id?: string;

    @Prop()
    userId: string;

    @Prop()
    type: TSanction;

    @Prop()
    date: number;

    @Prop()
    isActive: boolean;

    @Prop()
    duration?: number;

    @Prop()
    reason?: string;

    @Prop()
    adminId: string;
}

export const SanctionActivitySchema = SchemaFactory.createForClass(SanctionActivity);
