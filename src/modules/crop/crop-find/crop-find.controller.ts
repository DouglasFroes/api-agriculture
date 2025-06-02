import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropFindService } from './crop-find.service';

@ApiTags('Crops')
@Controller('crops')
export class CropFindController {
  constructor(private readonly cropFindService: CropFindService) {}

  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string) {
    return this.cropFindService.run(id);
  }
}
