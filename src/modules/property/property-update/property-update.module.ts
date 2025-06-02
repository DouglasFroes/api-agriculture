import { Module } from '@nestjs/common';
import { PropertyUpdateController } from './property-update.controller';
import { PropertyUpdateService } from './property-update.service';

@Module({
  controllers: [PropertyUpdateController],
  providers: [PropertyUpdateService],
  exports: [PropertyUpdateService],
})
export class PropertyUpdateModule {}
