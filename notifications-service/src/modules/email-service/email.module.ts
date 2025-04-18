import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { QueueHandlerModule } from '../queue-handler/queue-handler.module';

@Module({
  imports: [forwardRef(() => QueueHandlerModule)],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
