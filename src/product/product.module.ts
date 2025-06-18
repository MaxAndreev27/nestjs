import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from '../review/schemas/review.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Review.name, schema: ReviewSchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
