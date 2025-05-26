import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
    return Promise.resolve({
        uri: getMongoString(configService),
        ...getMongoOptions(),
    });
};

const getMongoString = (configService: ConfigService) =>
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTHDB');

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
