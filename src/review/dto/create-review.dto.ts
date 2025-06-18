import { IsString, IsNumber, Max, Min, IsMongoId } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(1, { message: 'Повинно бути більше 1' })
    @Max(5, { message: 'Повинно бути менше 5' })
    rating: number;

    @IsMongoId()
    @IsString()
    productId: string;
}
