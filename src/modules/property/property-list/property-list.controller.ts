import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyListService } from './property-list.service';

@ApiTags('Properties')
@Controller('properties')
export class PropertyListController {
  constructor(private readonly propertyListService: PropertyListService) {}

  @Get('list')
  async list() {
    return this.propertyListService.run();
  }
}
