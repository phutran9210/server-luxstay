import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

export enum Status {
  NEW = 'new',
  CONFIRM = 'confirm',
  CANCELED = 'canceled',
  CHECKOUT = 'checkout',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @Column({ type: 'bigint', nullable: false })
  totalPrice: number;

  @Column({ type: 'enum', enum: Status, default: Status.NEW })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updateAt: Date;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'roomID' })
  room: Room;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userID' })
  user: User;
}
