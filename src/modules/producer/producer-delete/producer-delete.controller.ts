import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProducerDeleteService } from './producer-delete.service';

@ApiTags('Producers')
@Controller('producers')
export class ProducerDeleteController {
  constructor(private readonly producerDeleteService: ProducerDeleteService) {}

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.producerDeleteService.run(id);
  }
}
