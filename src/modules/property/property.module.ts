import { Module } from '@nestjs/common';
import { PropertyCreateModule } from './property-create/property-create.module';
import { PropertyListModule } from './property-list/property-list.module';
import { PropertyFindModule } from './property-find/property-find.module';
import { PropertyUpdateModule } from './property-update/property-update.module';

@Module({
  imports: [
    PropertyCreateModule,
    PropertyListModule,
    PropertyFindModule,
    PropertyUpdateModule,
    // ...other modules
  ],
  // ...other metadata
})
export class PropertyModule {}
