import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyListDto } from './dto/property-list.dto';
import { PropertyListService } from './property-list.service';

@ApiTags('Properties')
@Controller('properties')
export class PropertyListController {
  constructor(private readonly propertyListService: PropertyListService) {}

  @Get()
  async list(@Query() query: PropertyListDto) {
    return this.propertyListService.run(query);
  }
}
