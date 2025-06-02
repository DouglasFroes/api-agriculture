import { PartialType } from '@nestjs/swagger';
import { PropertyCreateDto } from '../../property-create/dto/property-create.dto';

export class PropertyUpdateDto extends PartialType(PropertyCreateDto) {}
