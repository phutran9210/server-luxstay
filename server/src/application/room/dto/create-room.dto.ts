import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class RoomDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  roomName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  pricePerNight: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxGuest: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updateAt?: Date;

  @IsNotEmpty()
  @IsBoolean()
  wifi: boolean;

  @IsNotEmpty()
  @IsBoolean()
  bathingSupplies: boolean;

  @IsNotEmpty()
  @IsBoolean()
  airConditional: boolean;

  @IsNotEmpty()
  @IsBoolean()
  elevator: boolean;

  @IsNotEmpty()
  @IsBoolean()
  carPaking: boolean;

  @IsNotEmpty()
  @IsBoolean()
  receptionist: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cityLocation: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;
}
