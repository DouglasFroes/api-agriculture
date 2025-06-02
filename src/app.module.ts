import { Module } from '@nestjs/common';
import { CropModule } from './modules/crop/crop.module';
import { ProducerModule } from './modules/producer/producer.module';
import { PropertyModule } from './modules/property/property.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [ProvidersModule, ProducerModule, PropertyModule, CropModule],
})
export class AppModule {}
