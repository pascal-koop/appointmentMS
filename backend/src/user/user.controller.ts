import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { TCreateUserDto, TUpdateUserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';
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
  create(@Body() createUserDto: TCreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('update')
  @ApiOperation({
    summary: 'update user',
    operationId: 'updateUser',
  })
  @UseGuards(AuthGuard)
  update(
    @Body() updateUserDto: TUpdateUserDto,
    @Request() req: RequestWithUser,
  ) {
    const id = req.user.sub;
    return this.userService.updateUser(updateUserDto, id);
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
    const id = req.user.sub;
    const user = await this.userService.findUserById(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('delete')
  @ApiOperation({
    summary: 'delete user',
    operationId: 'deleteUser',
  })
  @UseGuards(AuthGuard)
  async deleteUser(
    @Request() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    const id = req.user.sub;
    await this.userService.deleteUser(id);
  }
}
