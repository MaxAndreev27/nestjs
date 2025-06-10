import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
    configService: ConfigService,
): Promise<JwtModuleOptions> => {
    return Promise.resolve({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '365d' },
    });
};
