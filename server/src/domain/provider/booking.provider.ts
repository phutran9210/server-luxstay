import { DataSource } from 'typeorm';
import { Booking } from '../entity/booking/booking.entity';
export const bookingProvider = [
  {
    provide: 'BOOKING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Booking),
    inject: ['DATA_SOURCE'],
  },
];
