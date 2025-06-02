import { Module } from '@nestjs/common';
import { ProducerCreateModule } from './producer-create/producer-create.module';
import { ProducerDeleteModule } from './producer-delete/producer-delete.module';
import { ProducerFindModule } from './producer-find/producer-find.module';
import { ProducerListModule } from './producer-list/producer-list.module';
import { ProducerUpdateModule } from './producer-update/producer-update.module';
import { ProducerCreate2Module } from './producer-create2/producer-create2.module';

@Module({
  imports: [
    ProducerCreateModule,
    ProducerListModule,
    ProducerDeleteModule,
    ProducerFindModule,
    ProducerUpdateModule,
    ProducerCreate2Module,
  ],
})
export class ProducerModule {}
