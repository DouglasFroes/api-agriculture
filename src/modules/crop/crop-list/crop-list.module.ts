import { Module } from '@nestjs/common';
import { CropListController } from './crop-list.controller';
import { CropListService } from './crop-list.service';

@Module({
  controllers: [CropListController],
  providers: [CropListService],
  exports: [CropListService],
})
export class CropListModule {}
