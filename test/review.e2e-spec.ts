import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const createReviewDto: CreateReviewDto = {
    name: 'Test name',
    title: 'Test title',
    description: 'Test description',
    rating: 5,
    productId: productId,
};

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        console.log(productId);
    });

    afterAll(async () => {
        await app.close();
    });

    it('/review/create (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send(createReviewDto)
            .expect(201)
            .expect((res: request.Response) => {
                createdId = res.body._id;
                expect(res.body).toBeDefined();
                expect(res.body.name).toEqual(createReviewDto.name);
                expect(res.body.title).toEqual(createReviewDto.title);
                expect(res.body.description).toEqual(
                    createReviewDto.description,
                );
                expect(res.body.rating).toEqual(createReviewDto.rating);
                expect(res.body.productId).toEqual(createReviewDto.productId);
            });
    });

    it('/review/findByProductId/:productId (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/review/findByProductId/' + productId)
            .expect(200)
            .then((res: request.Response) => {
                expect(res.body.length).toBe(1);
            });
    });

    it('/review/findByProductId/:productId (GET) - fail', async () => {
        return request(app.getHttpServer())
            .get(
                '/review/findByProductId/' + new Types.ObjectId().toHexString(),
            )
            .expect(200)
            .then((res: request.Response) => {
                expect(res.body.length).toBe(0);
            });
    });

    it('/review/findAll (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/review/findAll')
            .expect(200)
            .then((res: request.Response) => {
                expect(res.body.length).toBeGreaterThanOrEqual(1);
            });
    });

    it('/review/:id (DELETE) - success', async () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeDefined();
                expect(res.body._id).toEqual(createdId);
            });
    });
});
