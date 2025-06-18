import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Review } from '../../review/schemas/review.schema';

class ProductCharacteristic {
    @Prop()
    name: string;

    @Prop()
    value: string;
}

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    oldPrice?: number;

    @Prop()
    credit: number;

    @Prop()
    description: string;

    @Prop()
    advantages: string;

    @Prop()
    disAdvantages: string;

    @Prop({ type: [String] })
    categories: string[];

    @Prop({ type: [String] })
    tags: string[];

    @Prop({ type: [ProductCharacteristic], _id: false })
    characteristics: ProductCharacteristic[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Review' }] })
    reviews: Review[]; // Array of Review ObjectIds
}

export const ProductSchema = SchemaFactory.createForClass(Product);
