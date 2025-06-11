import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEmail = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data ? request[data] : request.user;
    },
);
