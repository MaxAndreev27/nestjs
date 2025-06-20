import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export class HhData {
    @Prop()
    count: number;

    @Prop()
    juniorSalary: number;

    @Prop()
    middleSalary: number;

    @Prop()
    seniorSalary: number;
}

export class TopPageAdvantage {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

export type TopPageDocument = HydratedDocument<TopPage>;

@Schema({ timestamps: true })
export class TopPage {
    @Prop({ enum: TopLevelCategory })
    firstCategory: TopLevelCategory;

    @Prop()
    secondCategory: string;

    @Prop({ unique: true })
    alias: string;

    @Prop({ index: true })
    title: string;

    @Prop()
    category: string;

    @Prop({ type: HhData })
    hh?: HhData;

    @Prop({ type: [TopPageAdvantage] })
    advantages: TopPageAdvantage[];

    @Prop({ index: true })
    seoText: string;

    @Prop()
    tagsTitle: string;

    @Prop({ type: [String] })
    tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
