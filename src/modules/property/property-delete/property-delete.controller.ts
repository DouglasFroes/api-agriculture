import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyDeleteService } from './property-delete.service';

@ApiTags('Properties')
@Controller('properties')
export class PropertyDeleteController {
  constructor(private readonly propertyDeleteService: PropertyDeleteService) {}

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyDeleteService.run(id);
  }
}
