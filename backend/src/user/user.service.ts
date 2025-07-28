import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello User!';
  }

  createUser(createUserDto: CreateUserDto) {
    console.log(`Creating user ${JSON.stringify(createUserDto)}`);
    return {
      success: true,
      message: 'User created successfully',
      user: {
        ...createUserDto,
        id: '1',
      },
    };
  }
}
