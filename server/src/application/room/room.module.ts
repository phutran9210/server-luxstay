import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { CloudinaryModule } from '../../domain/service/cloudinary/cloudinary.module';
import { DatabaseModule } from '../../domain/database/database.module';
import {
  roomProvider,
  imgRoomProvider,
} from '../../domain/provider/room.provider';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [RoomController],
  providers: [RoomService, ...imgRoomProvider, ...roomProvider],
})
export class RoomModule {}
