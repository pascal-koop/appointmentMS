import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
interface RequestWithUser extends Request {
  user: {
    sub: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    iat?: number;
    exp?: number;
  };
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create user',
    operationId: 'createUser',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  @ApiOperation({
    summary: 'get user profile',
    description:
      'get user profile of loggedIn user, works only if you logged in first and with httpOnly cookie is set',
    operationId: 'getProfile',
  })
  @UseGuards(AuthGuard)
  async getMyProfile(@Request() req: RequestWithUser) {
    const userId = req.user.sub;
    console.log(userId);
    const user = await this.userService.findUserById(userId);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
