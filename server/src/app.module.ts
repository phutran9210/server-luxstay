import { Module } from '@nestjs/common';
import { AuthModule } from './application/auth/auth.module';
import { DatabaseModule } from './domain/database/database.module';
import { UserModule } from './application/user/user.module';
import { RoomModule } from './application/room/room.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
