import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropDeleteService } from './crop-delete.service';

@ApiTags('Crops')
@Controller('crops')
export class CropDeleteController {
  constructor(private readonly cropDeleteService: CropDeleteService) {}

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.cropDeleteService.run(id);
  }
}
