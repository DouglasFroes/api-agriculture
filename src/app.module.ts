import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [ProvidersModule, ProducerModule],
})
export class AppModule {}
