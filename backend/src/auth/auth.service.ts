import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';
export interface SignInResult {
  access_token: string;
  id: string;
  refresh_token: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  created_at: Date;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async signIn(email: string, password: string): Promise<SignInResult> {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.id, username: user?.email };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.refreshTokenService.generateRefreshToken(
      user.id,
    );
    return {
      access_token,
      refresh_token,
      id: user.id,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
    };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const userId =
      await this.refreshTokenService.validateRefreshToken(refreshToken);
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return { access_token };
  }

  async logout(refreshToken: string): Promise<void> {
    if (refreshToken) {
      await this.refreshTokenService.revokeToken(refreshToken);
    }
  }
}
