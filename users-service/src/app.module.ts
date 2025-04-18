import { Module } from '@nestjs/common';
import { KafkaModule } from './modules/kafka/kafka.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EventHandlerModule } from './modules/event-handler/event-handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    UsersModule,
    EventHandlerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
