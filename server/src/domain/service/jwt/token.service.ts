import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { serialize } from 'cookie';
import { Response } from 'express';
import { UserDto } from '../../../application/user/dto/update-user.dto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(user: Partial<UserDto>): Promise<string> {
    const payload = { sub: user.id, username: user.name, role: user.role };
    return this.jwtService.signAsync(payload, { expiresIn: '24h' });
  }

  async createRefreshToken(user: Partial<UserDto>): Promise<string> {
    const payload = { sub: user.id, username: user.name };
    return this.jwtService.signAsync(payload, { expiresIn: '90d' });
  }

  setRefreshTokenCookie(response: Response, refreshToken: string): void {
    const cookie = serialize('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 30 * 3,
      path: '/',
    });
    response.setHeader('Set-Cookie', cookie);
  }

  clearRefreshTokenCookie(response: Response): void {
    response.clearCookie('refresh_token', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });
  }
}
