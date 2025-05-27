import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;
@Schema()
export class Review {
    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    rating: number;

    @Prop()
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
