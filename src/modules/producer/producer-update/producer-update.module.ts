import { Module } from '@nestjs/common';
import { ProducerUpdateController } from './producer-update.controller';
import { ProducerUpdateService } from './producer-update.service';

@Module({
  controllers: [ProducerUpdateController],
  providers: [ProducerUpdateService],
  exports: [ProducerUpdateService],
})
export class ProducerUpdateModule {}
