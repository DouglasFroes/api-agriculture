import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyUpdateDto } from './dto/property-update.dto';
import { PropertyUpdateService } from './property-update.service';

@ApiTags('Properties')
@Controller('properties')
export class PropertyUpdateController {
  constructor(private readonly propertyUpdateService: PropertyUpdateService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PropertyUpdateDto,
  ) {
    return this.propertyUpdateService.run(id, body);
  }
}
