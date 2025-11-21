import { Module } from '@nestjs/common';

import { MessagesRepository } from './message.repository';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesRepository, MessagesService],
})
export class MessagesModule {}
