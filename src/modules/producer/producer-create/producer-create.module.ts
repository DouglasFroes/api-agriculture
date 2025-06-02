import { Module } from '@nestjs/common';
import { ProducerCreateService } from './producer-create.service';
import { ProducerCreateController } from './producer-create.controller';

@Module({
  controllers: [ProducerCreateController],
  providers: [ProducerCreateService],
})
export class ProducerCreateModule {}
