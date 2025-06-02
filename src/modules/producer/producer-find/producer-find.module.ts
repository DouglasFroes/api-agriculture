import { Module } from '@nestjs/common';
import { ProducerFindController } from './producer-find.controller';
import { ProducerFindService } from './producer-find.service';

@Module({
  controllers: [ProducerFindController],
  providers: [ProducerFindService],
  exports: [ProducerFindService],
})
export class ProducerFindModule {}
