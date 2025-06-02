import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProducerUpdateDto } from './dto/producer-update.dto';
import { ProducerUpdateService } from './producer-update.service';

@ApiTags('Producers')
@Controller('producers')
export class ProducerUpdateController {
  constructor(private readonly producerUpdateService: ProducerUpdateService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ProducerUpdateDto,
  ) {
    return this.producerUpdateService.run(id, body);
  }
}
