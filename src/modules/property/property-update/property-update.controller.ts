import { Controller, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyUpdateService } from './property-update.service';
import { PropertyUpdateDto } from './dto/property-update.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertyUpdateController {
  constructor(private readonly propertyUpdateService: PropertyUpdateService) {}

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PropertyUpdateDto,
  ) {
    return this.propertyUpdateService.run(id, body);
  }
}
