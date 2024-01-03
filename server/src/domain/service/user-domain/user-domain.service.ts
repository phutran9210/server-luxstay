import { User } from '../../entity/user/user.entity';
import { UserDto } from '../../../application/user/dto/update-user.dto';

export class UserDomainService {
  public static registertoDto(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.email = user.email;
    return dto;
  }
}
