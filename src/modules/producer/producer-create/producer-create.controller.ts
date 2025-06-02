import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ProducerCreateDto } from './dto/producer-create.dto';
import { ProducerCreateService } from './producer-create.service';

@ApiTags('Producers')
@Controller('producers')
export class ProducerCreateController {
  constructor(private readonly producerCreateService: ProducerCreateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: ProducerCreateDto) {
    return this.producerCreateService.run(body);
  }
}
