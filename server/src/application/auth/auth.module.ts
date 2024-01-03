import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProvider } from '../../domain/provider/user.provider';
import { DatabaseModule } from '../../domain/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { TokenService } from '../../domain/service/jwt/token.service';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, ...userProvider],
})
export class AuthModule {}
