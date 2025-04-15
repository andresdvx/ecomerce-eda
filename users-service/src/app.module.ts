import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
