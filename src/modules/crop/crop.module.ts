import { Module } from '@nestjs/common';

import { CropCreateModule } from './crop-create/crop-create.module';
import { CropDeleteModule } from './crop-delete/crop-delete.module';
import { CropFindModule } from './crop-find/crop-find.module';
import { CropListModule } from './crop-list/crop-list.module';
import { CropUpdateModule } from './crop-update/crop-update.module';

@Module({
  imports: [
    CropCreateModule,
    CropListModule,
    CropFindModule,
    CropUpdateModule,
    CropDeleteModule,
  ],
})
export class CropModule {}
