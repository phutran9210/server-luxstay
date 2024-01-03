import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'roomImg', maxCount: 5 }]))
  create(
    @UploadedFiles() file: { roomImg: Express.Multer.File[] },
    @Body() createRoomDto: any,
  ) {
    return this.roomService.create(createRoomDto, file.roomImg);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
