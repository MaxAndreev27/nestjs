import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export type ReviewDocument = HydratedDocument<Review>;
@Schema({ timestamps: true })
export class Review extends Document {
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

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: Product; // Single Product ObjectId
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
