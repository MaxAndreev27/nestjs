import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
