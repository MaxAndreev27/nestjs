import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Review } from '../review/schemas/review.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
        @InjectModel(Review.name)
        private readonly reviewModel: Model<Review>,
    ) {}

    async create(dto: CreateProductDto): Promise<Product> {
        const createdProduct = await this.productModel.create(dto);
        return createdProduct;
    }

    async findById(id: string): Promise<ProductDocument | null> {
        return this.productModel.findById(id).populate('reviews').exec();
    }

    async findAll(): Promise<ProductDocument[]> {
        return this.productModel.find().populate('reviews').exec();
    }

    async delete(id: string): Promise<ProductDocument | null> {
        return this.productModel.findByIdAndDelete({ _id: id }).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }

    async findWithReviews(dto: FindProductDto): Promise<Product[]> {
        return (await this.productModel
            .aggregate([
                {
                    $match: {
                        categories: dto.category,
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
                {
                    $limit: dto.limit,
                },
                {
                    $lookup: {
                        from: 'reviews', // The collection to join with (lowercase, plural of model name)
                        localField: 'reviews', // Field from the input documents (Product's 'reviews' array)
                        foreignField: '_id', // Field from the "from" documents (Review's '_id')
                        as: 'populatedReviews', // The name of the new array field to add to the input documents
                    },
                },
                {
                    $addFields: {
                        reviewCount: { $size: '$populatedReviews' },
                        reviewAvg: { $avg: '$populatedReviews.rating' },
                    },
                },
            ])
            .exec()) as (Product & {
            populatedReviews: Review[];
            reviewCount: number;
            reviewAvg: number;
        })[];
    }
}
