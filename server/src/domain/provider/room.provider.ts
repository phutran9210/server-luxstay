import { DataSource } from 'typeorm';
import { Room } from '../entity/room/room.entity';
import { ImgRoom } from '../entity/room/image-room.entity';
export const roomProvider = [
  {
    provide: 'ROOM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
    inject: ['DATA_SOURCE'],
  },
];
export const imgRoomProvider = [
  {
    provide: 'IMG_ROOM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ImgRoom),
    inject: ['DATA_SOURCE'],
  },
];
