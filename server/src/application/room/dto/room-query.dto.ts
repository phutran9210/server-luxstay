import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  Length,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { responseConstain } from '../../../domain/infrastructure/app-constain';

export class RoomQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  page: number = responseConstain.DEFAULT_PAGE_NUMBER;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  size: number = responseConstain.DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  sortBy: string = responseConstain.DEFAULT_ROOM_SORT_BY;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  direction: string = 'asc';

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  searchTerm: string;
}
