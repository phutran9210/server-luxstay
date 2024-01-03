import { PartialType } from '@nestjs/mapped-types';

export class UserDto {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
