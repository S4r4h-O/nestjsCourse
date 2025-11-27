import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('user:', request.session.user);
    console.log('cookies:', context.switchToHttp().getRequest().headers.cookie);
    console.log('session:', context.switchToHttp().getRequest().session);

    return request.session.user;
  },
);
