import { Controller, Post, Get, NotFoundException, Body } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
