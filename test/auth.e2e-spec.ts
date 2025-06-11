import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
    login: 'editor@gmail.com',
    password: '123',
};

describe('AuthController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then((res: request.Response) => {
                expect(res.body.access_token).toBeDefined();
            });
    });

    it('/auth/login (POST) - fail password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '111' })
            .expect(401, {
                message: 'Невірний пароль',
                error: 'Unauthorized',
                statusCode: 401,
            });
    });

    it('/auth/login (POST) - fail login', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'eeeeee@gmail.com' })
            .expect(401, {
                message: 'Користувач з таким email не існує',
                error: 'Unauthorized',
                statusCode: 401,
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
