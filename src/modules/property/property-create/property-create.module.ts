import { Module } from '@nestjs/common';
import { PropertyCreateController } from './property-create.controller';
import { PropertyCreateService } from './property-create.service';

@Module({
  controllers: [PropertyCreateController],
  providers: [PropertyCreateService],
  exports: [PropertyCreateService],
})
export class PropertyCreateModule {}
