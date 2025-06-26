import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './schemas/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Review.name, schema: ReviewSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
        TelegramModule,
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
})
export class ReviewModule {}
