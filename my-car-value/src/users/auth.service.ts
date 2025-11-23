import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

import { UsersService } from './users.service';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // Hash user's password
    // generate a salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Create new user and save it
    const result = salt + '.' + hash.toString('hex');
    // return the user
  }

  signIn() {}
}
