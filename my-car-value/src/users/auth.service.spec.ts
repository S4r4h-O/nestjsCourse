import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp('blablabla@email.com', 'blablabla');

    expect(user.password).not.toEqual('blablabla');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user sign up with email that is in use', async () => {
    await service.signUp('blablabla@email.com', 'blablabla');
    await expect(
      service.signUp('blablabla@email.com', 'blablabla'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signIn('blebleble@email.com', 'blebleble'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if and invalid password is provided', async () => {
    await service.signUp('lasdf@lasdf.com', 'password');
    await expect(
      service.signIn('lasdf@lasdf.com', 'wrongpassword'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signUp('blablabla@email.com', 'mypassword');

    const user = await service.signIn('blablabla@email.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
