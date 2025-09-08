import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in with email and password',
    operationId: 'signIn',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'JWT access token',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = this.authService.signIn(signInDto.email, signInDto.password);
    res.cookie('access_token', (await result).access_token, {
      httpOnly: true,
      secure: false, // true in Prod (HTTPS)
      sameSite: 'lax',
      // Set cookie to expire in 24 hours (24 hours * 60 minutes * 60 seconds * 1000 ms)
      maxAge: 24 * 60 * 60 * 1000,
    });
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('logout')
  @ApiOperation({
    summary: 'logout',
    description: 'logout of the Application',
    operationId: 'logout',
  })
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { ok: true };
  }
}
