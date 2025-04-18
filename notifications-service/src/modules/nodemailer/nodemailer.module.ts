import { Module } from '@nestjs/common';
import { NodeMailerService } from './nodemailer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
