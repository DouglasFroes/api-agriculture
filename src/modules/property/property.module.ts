import { Module } from '@nestjs/common';
import { PropertyCreateModule } from './property-create/property-create.module';
import { PropertyDeleteModule } from './property-delete/property-delete.module';
import { PropertyFindModule } from './property-find/property-find.module';
import { PropertyListModule } from './property-list/property-list.module';
import { PropertyUpdateModule } from './property-update/property-update.module';

@Module({
  imports: [
    PropertyCreateModule,
    PropertyListModule,
    PropertyFindModule,
    PropertyUpdateModule,
    PropertyDeleteModule,
    // ...other modules
  ],
  // ...other metadata
})
export class PropertyModule {}
