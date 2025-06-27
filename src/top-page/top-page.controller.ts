import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { HhService } from '../hh/hh.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('top-page')
export class TopPageController {
    constructor(
        private readonly topPageService: TopPageService,
        private readonly hhService: HhService,
        private readonly scheduleRegistry: SchedulerRegistry,
    ) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    async findAll() {
        return this.topPageService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Param('id', IdValidationPipe) id: string) {
        const topPage = await this.topPageService.findById(id);
        if (!topPage) {
            throw new NotFoundException('Top Page Not Found');
        }
        return topPage;
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const page = await this.topPageService.findByAlias(alias);
        if (!page) {
            throw new NotFoundException('Top Page Not Found');
        }
        return page;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const detetedPage = await this.topPageService.delete(id);
        if (!detetedPage) {
            throw new NotFoundException('Top Page Not Found');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: CreateTopPageDto,
    ) {
        const updatedPage = await this.topPageService.updateById(id, dto);
        if (!updatedPage) {
            throw new NotFoundException('Top Page Not Found');
        }
        return updatedPage;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }

    @Get('textSearch/:text')
    async textSearch(@Param('text') text: string) {
        return this.topPageService.findByText(text);
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'test' })
    async test() {
        const job = this.scheduleRegistry.getCronJob('test');
        const data = await this.topPageService.findForHhUpdate(new Date());
        // eslint-disable-next-line
        for (let page of data) {
            const hhData = await this.hhService.getData(page.category);
            page.hh = hhData;
            await this.topPageService.updateById(page._id.toString(), page);
        }
    }
}
