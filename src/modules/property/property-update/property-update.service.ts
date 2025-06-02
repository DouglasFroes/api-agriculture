import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { PropertyUpdateDto } from './dto/property-update.dto';

@Injectable()
export class PropertyUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string, data: PropertyUpdateDto) {
    const property = await this.prismaService.property.findUnique({
      where: { id },
    });
    if (!property) throw new NotFoundException('Property not found');
    // Se alguma área for atualizada, valida a soma
    const totalArea = data.totalArea ?? property.totalArea;
    const arableArea = data.arableArea ?? property.arableArea;
    const vegetationArea = data.vegetationArea ?? property.vegetationArea;
    if (arableArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'The sum of arable and vegetation areas cannot exceed the total area',
      );
    }

    await this.prismaService.property.update({ where: { id }, data });
  }
}
