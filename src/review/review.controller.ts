import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
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
    async findById(@Param('id', IdValidationPipe) id: string) {
        return this.reviewService.findById(id);
    }

    @Get('findByProductId/:productId')
    async findByProductId(
        @Param('productId', IdValidationPipe) productId: string,
    ) {
        return this.reviewService.findByProductId(productId);
    }

    @Delete('deleteByProductId/:productId')
    async deleteByProductId(
        @Param('productId', IdValidationPipe) productId: string,
    ) {
        return this.reviewService.deleteByProductId(productId);
    }
}
