import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProducerFindService } from './producer-find.service';

@ApiTags('Producers')
@Controller('producers')
export class ProducerFindController {
  constructor(private readonly producerFindService: ProducerFindService) {}

  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string) {
    return this.producerFindService.run(id);
  }
}
