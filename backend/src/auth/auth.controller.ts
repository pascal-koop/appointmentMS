import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './auth.dto';
import { Response } from 'express';
type ReqWithCookies = Request & {
  cookies?: Record<string, string | undefined>;
};
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
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false, // true in Prod (HTTPS)
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15min
    });
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Tage
    });
    return {
      id: result.id,
      email: result.email,
      phone: result.phone,
      first_name: result.first_name,
      last_name: result.last_name,
      created_at: result.created_at,
    };
    /* return this.authService.signIn(signInDto.email, signInDto.password); */
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get new access token using refresh token',
  })
  async refresh(
    @Req() req: ReqWithCookies,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    const { access_token } =
      await this.authService.refreshAccessToken(refreshToken);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 Minuten
    });

    return { success: true };
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
    res.clearCookie('refresh_token');
    return { ok: true };
  }

  @Get('status')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'check auth status',
    description: 'check the auth status',
    operationId: 'checkAuth',
  })
  @HttpCode(HttpStatus.OK)
  getStatus() {
    return { authenticated: true };
  }
}
