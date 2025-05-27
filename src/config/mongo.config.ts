import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { Connection } from 'mongoose';

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
    return Promise.resolve({
        uri: getMongoString(configService),
        onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => console.log('connected'));
            connection.on('open', () => console.log('open'));
            connection.on('disconnected', () => console.log('disconnected'));
            connection.on('reconnected', () => console.log('reconnected'));
            connection.on('disconnecting', () => console.log('disconnecting'));
            return connection;
        },
    });
};

// mongoose.connect('mongodb://username:password@host:port/database?options...');
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
