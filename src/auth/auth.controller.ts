import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { JwtAuthGuard } from './guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.authService.findUser(dto.login);
        if (oldUser) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }
        return this.authService.createUser(dto);
    }

    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedUser = this.authService.delete(id);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        if (!deletedUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
            return deletedUser;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAll')
    async findAll() {
        return this.authService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', IdValidationPipe) id: string) {
        return this.authService.findById(id);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() { login, password }: AuthDto) {
        const { email } = await this.authService.validateUser(login, password);
        return this.authService.login(email);
    }
}
