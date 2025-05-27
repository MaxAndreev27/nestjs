import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedReview = this.reviewService.delete(id);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        if (!deletedReview) {
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
        } else {
            return deletedReview;
        }
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string) {}
}
