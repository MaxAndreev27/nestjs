import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    ) {}

    async create(dto: CreateReviewDto): Promise<Review> {
        const createdReview = await this.reviewModel.create(dto);
        return createdReview;
    }

    async findAll(): Promise<Review[]> {
        return this.reviewModel.find().exec();
    }

    async findOne(id: string): Promise<Review | null> {
        return this.reviewModel.findOne({ _id: id }).exec();
    }

    async findByProductId(productId: string): Promise<Review[]> {
        return this.reviewModel.find({ productId: productId }).exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({ productId: productId }).exec();
    }

    async delete(id: string): Promise<Review | null> {
        return await this.reviewModel.findByIdAndDelete({ _id: id }).exec();
    }
}
