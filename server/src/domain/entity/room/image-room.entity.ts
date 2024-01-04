import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('image_room')
export class ImgRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imgUrl: string;

  @ManyToOne(() => Room, (room) => room.images)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
