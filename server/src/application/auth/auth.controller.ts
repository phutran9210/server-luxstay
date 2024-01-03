import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenService } from '../../domain/service/jwt/token.service';

@Controller('api/v1/users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post('log-in')
  async logIn(
    @Body() loginData: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    try {
      const { accessToken, refreshToken } = await this.authService.loginUser(
        loginData.email,
        loginData.password,
      );
      this.tokenService.setRefreshTokenCookie(response, refreshToken);
      response.status(HttpStatus.OK).json({
        message: 'Login Success!',
        accessToken,
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        response.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message || 'Unauthorized',
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Unknown Internal Server Error',
        });
      }
    }

    throw new HttpException('Login Failure!', HttpStatus.BAD_REQUEST);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    try {
      this.tokenService.clearRefreshTokenCookie(response);
      response.status(HttpStatus.OK).json({
        message: 'Logout successful.',
      });
    } catch (error) {
      throw new HttpException(
        'Log out Failure!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
