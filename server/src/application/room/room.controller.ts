import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  Query,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RoomDomainService } from '../../domain/service/room-domain/room-domain.service';
import { allowedFormats } from '../../domain/infrastructure/app-constain';
import {
  MultipartBody,
  ValidationUtil,
} from '../../domain/service/room-domain/room-domain.service';
import { RoomQueryDto } from './dto/room-query.dto';

@Controller('api/v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'roomImg', maxCount: 5 }], {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFiles() file: { roomImg: Express.Multer.File[] },
    @MultipartBody() createRoomDto: RoomDto,
  ) {
    if (file && createRoomDto) {
      const validationErrors = await ValidationUtil.validateDTO(createRoomDto);
      if (validationErrors.length > 0) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: 'Validation failed',
            details: validationErrors,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const isValidFormat = RoomDomainService.validateImageFormat(
        file.roomImg,
        allowedFormats,
      );
      if (!isValidFormat) {
        throw new BadRequestException('Invalid image format.');
      }
      try {
        const result = await this.roomService.create(
          createRoomDto,
          file.roomImg,
        );
        return new HttpException(
          {
            status: HttpStatus.CREATED,
            message: 'Created Success.',
            data: result,
          },
          HttpStatus.CREATED,
        );
      } catch (error) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    throw new NotAcceptableException('Incoming data error');
  }

  @Get()
  async findAll(@Query() query: RoomQueryDto) {
    try {
      const results = await this.roomService.findAll(query);
      // return new HttpException(results, HttpStatus.OK);
    } catch (error) {
      throw new BadRequestException('Unknown server error.');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.roomService.findOne(id);
      return new HttpException(result, HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`${id} not found.`);
      }
      throw new InternalServerErrorException();
    }
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
