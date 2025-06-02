import { Module } from '@nestjs/common';
import { PropertyCreateModule } from './property-create/property-create.module';

@Module({
  imports: [
    PropertyCreateModule,
    // ...other modules
  ],
  // ...other metadata
})
export class PropertyModule {}
