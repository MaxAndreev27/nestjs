import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService,
    ) {}

    @Get()
    getHello(): string | undefined {
        // return this.appService.getHello();
        // const test: string = this.configService.get('TEST');
        // if (test) {
        return this.configService.get('MONGO_PORT');
        // }
    }
}
