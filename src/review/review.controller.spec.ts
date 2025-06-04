import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('ReviewController', () => {
    let controller: ReviewController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewController],
        })
            .useMocker((token) => {
                const results = ['test1', 'test2'];
                if (token === ReviewService) {
                    return { findAll: jest.fn().mockResolvedValue(results) };
                }
                if (typeof token === 'function') {
                    const mockMetadata = moduleMocker.getMetadata(
                        token,
                    ) as MockFunctionMetadata<any, any>;
                    const Mock =
                        moduleMocker.generateFromMetadata(mockMetadata);
                    // eslint-disable-next-line
                    return new Mock();
                }
            })
            .compile();

        controller = module.get<ReviewController>(ReviewController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
