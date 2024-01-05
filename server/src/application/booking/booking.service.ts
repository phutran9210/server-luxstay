import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Room } from '../../domain/entity/room/room.entity';
import { Booking } from '../../domain/entity/booking/booking.entity';
import { User } from '../../domain/entity/user/user.entity';
import { Brackets, Repository } from 'typeorm';
import { Status } from '../../domain/entity/booking/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @Inject('ROOM_REPOSITORY')
    private roomRepository: Repository<Room>,
    @Inject('ROOM_REPOSITORY')
    private bookingRepository: Repository<Booking>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createBookingDto: any) {
    const orderDate = createBookingDto.date;
    const checkInDate = orderDate[0];
    const checkOutDate = orderDate[1];

    const location = createBookingDto.location;
    const roomID = createBookingDto.roomID;
    const userID = createBookingDto.userID;

    const existingRooms = await this.roomRepository
      .createQueryBuilder('room')
      .where('room.cityLocation = :location', { location: location })
      .leftJoinAndSelect('room.bookings', 'booking')
      .andWhere('booking.status IN (:statuses)', { statuses: [Status.CONFIRM] })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'booking.startDate BETWEEN :checkInDate AND :checkOutDate ',
            { checkInDate, checkOutDate },
          )
            .orWhere(
              'booking.endDate BETWEEN :checkInDate AND :checkOutDate ',
              { checkInDate, checkOutDate },
            )
            .orWhere(
              'booking.startDate <= :checkInDate AND booking.endDate >= :checkOutDate',
              { checkInDate, checkOutDate },
            );
        }),
      )
      .getManyAndCount();

    return existingRooms;
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
