import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TRole } from '../db.interface';
export type UserDocument = User & Document;

@Schema()
export class User {
    _id?: string;

    @Prop()
    pseudo: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    avatar?: string;

    @Prop()
    accessToken?: string;

    @Prop()
    role: TRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
