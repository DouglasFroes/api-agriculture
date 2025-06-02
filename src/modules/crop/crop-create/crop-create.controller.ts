import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CropCreateService } from './crop-create.service';
import { CropCreateDto } from './dto/crop-create.dto';

@ApiTags('Crops')
@Controller('crops')
export class CropCreateController {
  constructor(private readonly cropCreateService: CropCreateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CropCreateDto) {
    return this.cropCreateService.run(body);
  }
}
