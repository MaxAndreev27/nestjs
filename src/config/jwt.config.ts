import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
    configService: ConfigService,
): Promise<JwtModuleOptions> => {
    return Promise.resolve({
        secret: configService.get('JWT_SECRET'),
    });
};
