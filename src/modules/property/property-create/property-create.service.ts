import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';
import { PropertyCreateDto } from './dto/property-create.dto';

@Injectable()
export class PropertyCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: PropertyCreateDto) {
    showLog('Iniciando criação de propriedade', data);
    if (data.arableArea + data.vegetationArea > data.totalArea) {
      showLog('Erro: Soma das áreas maior que o total', data);
      throw new BadRequestException(
        'The sum of arable and vegetation areas cannot exceed the total area',
      );
    }

    const created = await this.prismaService.property.create({
      data: {
        name: data.name,
        city: data.city,
        state: data.state,
        totalArea: data.totalArea,
        arableArea: data.arableArea,
        vegetationArea: data.vegetationArea,
        producerId: data.producerId,
      },
    });
    showLog('Propriedade criada com sucesso', created);
    return created;
  }
}
