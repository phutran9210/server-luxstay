import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  password: string;
}
