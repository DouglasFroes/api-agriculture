import { PartialType } from '@nestjs/swagger';
import { ProducerCreateDto } from '../../producer-create/dto/producer-create.dto';

export class ProducerUpdateDto extends PartialType(ProducerCreateDto) {}
