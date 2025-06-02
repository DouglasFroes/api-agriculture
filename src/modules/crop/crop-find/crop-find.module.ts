import { Module } from '@nestjs/common';
import { CropFindController } from './crop-find.controller';
import { CropFindService } from './crop-find.service';

@Module({
  controllers: [CropFindController],
  providers: [CropFindService],
  exports: [CropFindService],
})
export class CropFindModule {}
