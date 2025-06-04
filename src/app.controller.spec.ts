import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AppService } from './app.service';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            // providers: [AppService],
        })
            .useMocker((token) => {
                const results = ['test1', 'test2'];
                if (token === AppService) {
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

        appController = app.get<AppController>(AppController);
    });

    it('should be defined', () => {
        expect(appController).toBeDefined();
    });

    // describe('root', () => {
    //     it('should return "Hello World!"', () => {
    //         expect(appController.getHello()).toBe('Hello World!');
    //     });
    // });
});
