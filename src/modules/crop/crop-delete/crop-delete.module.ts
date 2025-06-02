import { Module } from '@nestjs/common';
import { CropDeleteController } from './crop-delete.controller';
import { CropDeleteService } from './crop-delete.service';

@Module({
  controllers: [CropDeleteController],
  providers: [CropDeleteService],
  exports: [CropDeleteService],
})
export class CropDeleteModule {}
