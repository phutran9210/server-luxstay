import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { Room } from '../../domain/entity/room/room.entity';
import { ImgRoom } from '../../domain/entity/room/image-room.entity';
import { CloudinaryService } from '../../domain/service/cloudinary/cloudinary.service';
import { RoomQueryDto } from './dto/room-query.dto';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private roomRepository: Repository<Room>,
    @Inject('IMG_ROOM_REPOSITORY')
    private imgRoomRepository: Repository<ImgRoom>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(createRoomDto: RoomDto, files: Express.Multer.File[]) {
    const uploadResults =
      await this.cloudinaryService.uploadMultipleImages(files);
    const imgRoomEntities = uploadResults.map((url) =>
      this.imgRoomRepository.create({ imgUrl: url }),
    );

    const newRoom = this.roomRepository.create({
      ...createRoomDto,
      images: imgRoomEntities,
    });
    const addedRoom = await this.roomRepository.save(newRoom);

    return addedRoom;
  }

  async findAll(query: RoomQueryDto) {
    const page = query.page;
    const size = query.size;
    const sortBy = query.sortBy;
    const direction = query.direction;
    const searchTerm = query.searchTerm;

    // const [rooms, total] = await this.roomRepository.findAndCount({
    //   relations: { images: true },
    //   order: { [sortBy]: direction },
    //   skip: page * size,
    //   take: size,
    // });

    // const totalPages = Math.ceil(total / size);
    // const currentPage = page + 1;

    // return { rooms, total, totalPages, currentPage };
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id: id },
      relations: { images: true },
    });
    if (!room) {
      throw new NotFoundException();
    }

    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
