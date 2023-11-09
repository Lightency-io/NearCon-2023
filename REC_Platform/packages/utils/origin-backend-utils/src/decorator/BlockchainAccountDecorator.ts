import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BlockchainAccountDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        try {
            return request.user?.organization?.blockchainAccountAddress;
        } catch (e) {
            return null;
        }
    }
);
