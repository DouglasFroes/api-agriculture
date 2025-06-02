import { Module } from '@nestjs/common';
import { CropCreateController } from './crop-create.controller';
import { CropCreateService } from './crop-create.service';

@Module({
  controllers: [CropCreateController],
  providers: [CropCreateService],
  exports: [CropCreateService],
})
export class CropCreateModule {}
