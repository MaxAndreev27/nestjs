import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.constants';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get('findAll')
    async findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedProduct = this.productService.delete(id);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        if (!deletedProduct) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        } else {
            return deletedProduct;
        }
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: Product) {
        const updatedProduct = await this.productService.updateById(id, dto);
        if (!updatedProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }
        return updatedProduct;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
