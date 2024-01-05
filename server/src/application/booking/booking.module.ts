import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from '../../domain/database/database.module';
import { roomProvider } from '../../domain/provider/room.provider';
import { bookingProvider } from '../../domain/provider/booking.provider';
import { userProvider } from '../../domain/provider/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    ...roomProvider,
    ...bookingProvider,
    ...userProvider,
  ],
})
export class BookingModule {}
