import { Module } from '@nestjs/common';
import { ProducerCreateModule } from './producer-create/producer-create.module';

@Module({
  imports: [ProducerCreateModule],
})
export class ProducerModule {}
