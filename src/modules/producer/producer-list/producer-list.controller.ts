import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { producerListDto } from './dto/producer-list.dto';
import { ProducerListService } from './producer-list.service';

@ApiTags('Producers')
@Controller('producers')
export class ProducerListController {
  constructor(private readonly producerListService: ProducerListService) {}

  @Get('list')
  async list(@Query() query: producerListDto) {
    return this.producerListService.run(query);
  }
}
