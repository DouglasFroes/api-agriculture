import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropCreateModule } from './crop-create/crop-create.module';
import { CropController } from './crop.controller';
import { Crop } from './crop.entity';
import { CropService } from './crop.service';
import { CropListModule } from './crop-list/crop-list.module';
import { CropFindModule } from './crop-find/crop-find.module';
import { CropUpdateModule } from './crop-update/crop-update.module';
import { CropDeleteModule } from './crop-delete/crop-delete.module';

@Module({
  imports: [TypeOrmModule.forFeature([Crop]), CropCreateModule, CropListModule, CropFindModule, CropUpdateModule, CropDeleteModule],
  providers: [CropService],
  controllers: [CropController],
})
export class CropModule {}
