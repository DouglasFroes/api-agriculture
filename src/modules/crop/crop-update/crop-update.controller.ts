import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropUpdateService } from './crop-update.service';
import { CropUpdateDto } from './dto/crop-update.dto';

@ApiTags('Crops')
@Controller('crops')
export class CropUpdateController {
  constructor(private readonly cropUpdateService: CropUpdateService) {}

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CropUpdateDto,
  ) {
    return this.cropUpdateService.run(id, body);
  }
}
