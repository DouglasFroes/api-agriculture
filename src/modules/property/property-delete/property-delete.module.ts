import { Module } from '@nestjs/common';
import { PropertyDeleteController } from './property-delete.controller';
import { PropertyDeleteService } from './property-delete.service';

@Module({
  controllers: [PropertyDeleteController],
  providers: [PropertyDeleteService],
  exports: [PropertyDeleteService],
})
export class PropertyDeleteModule {}
