import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    TopLevelCategory,
    TopPage,
    TopPageDocument,
} from './schemas/top-page.schema';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { addDays } from 'date-fns';

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
        // return this.topPageModel
        //     .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
        //     .exec();
        return this.topPageModel
            .aggregate()
            .match({
                firstCategory,
            })
            .group({
                _id: { secondCategory: '$secondCategory' },
                pages: { $push: { alias: '$alias', title: '$title' } },
            })
            .exec();
    }

    async findByText(text: string) {
        // return this.topPageModel
        // .find({
        //     $text: {
        //         $search: text,
        //         $caseSensitive: false,
        //     },
        // })
        // .exec();
        return this.topPageModel
            .find({
                $or: [
                    { title: { $regex: text, $options: 'i' } },
                    { seoText: { $regex: text, $options: 'i' } },
                    { tagsTitle: { $regex: text, $options: 'i' } },
                    { tags: { $in: [text] } }, // Search within the tags array
                ],
            })
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

    async findForHhUpdate(date: Date) {
        return this.topPageModel
            .find({
                firstCategory: 0,
                $or: [
                    { 'hh.updatedAt': { $lt: addDays(date, -1) } },
                    { 'hh.updatedAt': { $exists: false } },
                ],
            })
            .exec();
    }
}
