import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

class MockYourModel {
    constructor(private data) {}
    // save = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue([]);
    static findOne = jest.fn().mockResolvedValue(null);
    static findOneAndUpdate = jest.fn().mockResolvedValue(null);
    static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('ReviewService', () => {
    let service: ReviewService;
    let mockModel: Model<Review>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewService,
                {
                    provide: getModelToken(Review.name),
                    useValue: MockYourModel,
                },
            ],
        }).compile();

        service = module.get<ReviewService>(ReviewService);

        service = module.get<ReviewService>(ReviewService);
        mockModel = module.get<Model<Review>>(getModelToken(Review.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // it('should call find method from the model', async () => {
    //     await service.findAll();
    //     expect(MockYourModel.find).toHaveBeenCalled();
    // });

    // it('should call findOne method from the model', async () => {
    //     await service.findOne('test');
    //     expect(MockYourModel.findOne).toHaveBeenCalledWith({ _id: 'test' });
    // });
});
