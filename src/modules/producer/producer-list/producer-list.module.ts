import { Module } from '@nestjs/common';
import { ProducerListController } from './producer-list.controller';
import { ProducerListService } from './producer-list.service';

@Module({
  controllers: [ProducerListController],
  providers: [ProducerListService],
  exports: [ProducerListService],
})
export class ProducerListModule {}
