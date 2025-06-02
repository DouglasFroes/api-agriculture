import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ProducerCreateDto } from './dto/producer-create.dto';
import { ProducerCreateService } from './producer-create.service';

@Controller('producers')
export class ProducerCreateController {
  constructor(private readonly producerCreateService: ProducerCreateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: ProducerCreateDto) {
    return this.producerCreateService.run(body);
  }
}
