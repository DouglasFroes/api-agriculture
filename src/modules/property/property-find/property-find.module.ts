import { Module } from '@nestjs/common';
import { PropertyFindController } from './property-find.controller';
import { PropertyFindService } from './property-find.service';

@Module({
  controllers: [PropertyFindController],
  providers: [PropertyFindService],
  exports: [PropertyFindService],
})
export class PropertyFindModule {}
