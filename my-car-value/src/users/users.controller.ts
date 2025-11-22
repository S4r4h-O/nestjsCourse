import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/creater-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
