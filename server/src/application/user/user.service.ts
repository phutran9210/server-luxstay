import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../../domain/entity/user/user.entity';
import { UserDomainService } from '../../domain/service/user-domain/user-domain.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

const numberOfSalt = +process.env.SALT;

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<Partial<UserDto>> {
    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException();
    }
    try {
      const salt = await bcrypt.genSalt(numberOfSalt);
      const hash = await bcrypt.hash(password, salt);
      const newUser = this.userRepository.create({
        email: email,
        hashPassword: hash,
      });
      const addedUser = await this.userRepository.save(newUser);
      return UserDomainService.registertoDto(addedUser);
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
