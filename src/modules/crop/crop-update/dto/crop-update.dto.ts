import { PartialType } from '@nestjs/swagger';
import { CropCreateDto } from '../../crop-create/dto/crop-create.dto';

export class CropUpdateDto extends PartialType(CropCreateDto) {}
