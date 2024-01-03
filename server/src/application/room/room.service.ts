import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { Room } from '../../domain/entity/room/room.entity';
import { ImgRoom } from '../../domain/entity/room/image-room.entity';
import { CloudinaryService } from '../../domain/service/cloudinary/cloudinary.service';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private roomRepository: Repository<Room>,
    @Inject('IMG_ROOM_REPOSITORY')
    private imgRoomRepository: Repository<ImgRoom>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(createRoomDto: any, files: Express.Multer.File[]) {
    const uploadResults =
      await this.cloudinaryService.uploadMultipleImages(files);

    return uploadResults;
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
