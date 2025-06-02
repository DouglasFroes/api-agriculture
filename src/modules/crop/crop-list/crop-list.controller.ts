import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropListService } from './crop-list.service';
import { CropListDto } from './dto/crop-list.dto';

@ApiTags('Crops')
@Controller('crops')
export class CropListController {
  constructor(private readonly cropListService: CropListService) {}

  @Get()
  async list(@Query() query: CropListDto) {
    return this.cropListService.run(query);
  }
}
