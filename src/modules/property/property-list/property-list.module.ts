import { Module } from '@nestjs/common';
import { PropertyListController } from './property-list.controller';
import { PropertyListService } from './property-list.service';

@Module({
  controllers: [PropertyListController],
  providers: [PropertyListService],
  exports: [PropertyListService],
})
export class PropertyListModule {}
