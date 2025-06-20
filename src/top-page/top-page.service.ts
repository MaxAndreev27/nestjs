import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    TopLevelCategory,
    TopPage,
    TopPageDocument,
} from './schemas/top-page.schema';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { ProductDocument } from '../product/schemas/product.schema';
import { CreateProductDto } from '../product/dto/create-product.dto';

@Injectable()
export class TopPageService {
    constructor(
        @InjectModel(TopPage.name)
        private readonly topPageModel: Model<TopPage>,
    ) {}

    async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
        const createdTopPage = await this.topPageModel.create(dto);
        return createdTopPage;
    }

    async findById(id: string): Promise<TopPageDocument | null> {
        return this.topPageModel.findById(id).exec();
    }

    async findAll(): Promise<TopPageDocument[]> {
        return this.topPageModel.find().exec();
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        return this.topPageModel
            .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
            .exec();
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<TopPageDocument | null> {
        return this.topPageModel.findByIdAndDelete({ _id: id }).exec();
    }
}
