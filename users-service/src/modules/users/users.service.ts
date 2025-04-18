import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/modules/kafka/kafka.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly kafkaService: KafkaService) {}

  async createUser(userData: CreateUserDto) {
    const userId = v4();
    const { name, lastName, email, password, phone } = userData;
    const user = new UserEntity(userId, name, lastName, email, phone, password);

    const message = this.kafkaService.buildKafkaMessage(
      'welcome-flow',
      {
        user: user.toPublic(),
      },
      'user-registration',
      user.toObject(),
    );

    await this.kafkaService.emit('welcome-flow', message);
    return user;
  }
}
