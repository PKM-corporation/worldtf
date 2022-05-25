import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
}

export const UserSchema = SchemaFactory.createForClass(User);
