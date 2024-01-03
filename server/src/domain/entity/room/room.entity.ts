import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImgRoom } from './image-room.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  roomName: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'bigint', nullable: false })
  pricePerNight: number;

  @Column({ type: 'int', unsigned: true, default: 1 })
  maxGuest: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updateAt: Date;

  //tiện ích
  @Column({ type: 'boolean', default: false })
  wifi: boolean;

  @Column({ type: 'boolean', default: false })
  bathingSupplies: boolean;

  @Column({ type: 'boolean', default: false })
  airConditional: boolean;

  @Column({ type: 'boolean', default: false })
  elevator: boolean;

  @Column({ type: 'boolean', default: false })
  carPaking: boolean;

  @Column({ type: 'boolean', default: false })
  receptionist: boolean;

  // thông tin địa chỉ
  @Column({ type: 'varchar', length: 255, nullable: false })
  cityLocation: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: boolean;

  //relation
  @OneToMany(() => ImgRoom, (image) => image.room)
  images: ImgRoom[];
}
