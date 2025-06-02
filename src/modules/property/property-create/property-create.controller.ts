import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyCreateDto } from './dto/property-create.dto';
import { PropertyCreateService } from './property-create.service';

@ApiTags('Properties')
@Controller('properties')
export class PropertyCreateController {
  constructor(private readonly propertyCreateService: PropertyCreateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: PropertyCreateDto) {
    return this.propertyCreateService.run(body);
  }
}
