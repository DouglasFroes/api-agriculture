import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyFindService } from './property-find.service';

@ApiTags('Properties')
@Controller('properties')
export class PropertyFindController {
  constructor(private readonly propertyFindService: PropertyFindService) {}

  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyFindService.run(id);
  }
}
