import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    console.log('cookies:', context.switchToHttp().getRequest().headers.cookie);
    console.log('session:', context.switchToHttp().getRequest().session);

    return 'hi there';
  },
);
