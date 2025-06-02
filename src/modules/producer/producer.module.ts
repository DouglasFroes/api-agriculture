import { Module } from '@nestjs/common';
import { ProducerCreateModule } from './producer-create/producer-create.module';
import { ProducerDeleteModule } from './producer-delete/producer-delete.module';
import { ProducerFindModule } from './producer-find/producer-find.module';
import { ProducerListModule } from './producer-list/producer-list.module';
import { ProducerUpdateModule } from './producer-update/producer-update.module';

@Module({
  imports: [
    ProducerCreateModule,
    ProducerListModule,
    ProducerDeleteModule,
    ProducerFindModule,
    ProducerUpdateModule,
  ],
})
export class ProducerModule {}
