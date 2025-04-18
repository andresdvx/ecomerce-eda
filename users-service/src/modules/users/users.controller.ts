import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  private logger = new Logger('Users-Producer');
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.createUser(userData);
  }
}
