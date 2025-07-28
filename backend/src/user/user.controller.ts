import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get hello',
    description: 'Get hello from user',
    operationId: 'getHello',
  })
  getHello(): string {
    return this.userService.getHello();
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create user',
    operationId: 'createUser',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
