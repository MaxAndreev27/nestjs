import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe())
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

    @Get('findAll')
    async findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.reviewService.findOne(id);
    }

    @Get('findByProductId/:productId')
    async findByProductId(@Param('productId') productId: string) {
        return this.reviewService.findByProductId(productId);
    }

    @Delete('deleteByProductId/:productId')
    async deleteByProductId(@Param('productId') productId: string) {
        return this.reviewService.deleteByProductId(productId);
    }
}
