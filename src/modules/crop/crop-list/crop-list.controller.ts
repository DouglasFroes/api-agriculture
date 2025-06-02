import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropListService } from './crop-list.service';

@ApiTags('Crops')
@Controller('crops')
export class CropListController {
  constructor(private readonly cropListService: CropListService) {}

  @Get('list')
  async list() {
    return this.cropListService.run();
  }
}
