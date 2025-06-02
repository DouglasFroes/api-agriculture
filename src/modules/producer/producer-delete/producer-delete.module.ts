import { Module } from '@nestjs/common';
import { ProducerDeleteController } from './producer-delete.controller';
import { ProducerDeleteService } from './producer-delete.service';

@Module({
  controllers: [ProducerDeleteController],
  providers: [ProducerDeleteService],
  exports: [ProducerDeleteService],
})
export class ProducerDeleteModule {}
