import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { RoomDto } from '../../../application/room/dto/create-room.dto';
import { plainToClass } from 'class-transformer';

//validate định dạng ảnh
export class RoomDomainService {
  static validateImageFormat(
    images: Express.Multer.File[],
    allowedFormats: string[],
  ): boolean {
    return images.every((image) => allowedFormats.includes(image.mimetype));
  }
}

//chuyển đổi json form tạo room
export const MultipartBody = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.body && request.body.data) {
      return JSON.parse(request.body.data);
    }
    return undefined;
  },
);

//Validate data tạo room
export class ValidationUtil {
  static async validateDTO(data: unknown) {
    const dto = plainToClass(RoomDto, data);
    const errors: ValidationError[] = await validate(dto);
    if (errors.length > 0) {
      return this.formatErrors(errors);
    }
    return [];
  }

  private static formatErrors(errors: ValidationError[]): string[] {
    return errors.reduce((acc, err) => {
      const constraints = err.constraints ? Object.values(err.constraints) : [];
      return acc.concat(constraints);
    }, []);
  }
}
