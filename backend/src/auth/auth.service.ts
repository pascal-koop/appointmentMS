import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
export interface SignInResult {
  access_token: string;
  id: string;
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
    return {
      access_token,
      id: user.id,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
    };
  }
}
