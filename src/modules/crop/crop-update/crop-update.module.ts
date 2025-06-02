import { Module } from '@nestjs/common';
import { CropUpdateController } from './crop-update.controller';
import { CropUpdateService } from './crop-update.service';

@Module({
  controllers: [CropUpdateController],
  providers: [CropUpdateService],
  exports: [CropUpdateService],
})
export class CropUpdateModule {}
