import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/domain/entity/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { TokenService } from '../../domain/service/jwt/token.service';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!existingUser) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, existingUser.hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const accessToken = await this.tokenService.createAccessToken(existingUser);
    const refreshToken =
      await this.tokenService.createRefreshToken(existingUser);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
