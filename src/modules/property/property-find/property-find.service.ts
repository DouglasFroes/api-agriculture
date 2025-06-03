import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';

@Injectable()
export class PropertyFindService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    showLog('Iniciando busca de propriedade', id);
    const property = await this.prismaService.property.findUnique({
      where: { id },
      include: {
        producer: true,
        crops: true,
      },
    });

    if (!property) {
      showLog('Propriedade não encontrada', id);
      throw new NotFoundException('Property not found');
    }

    showLog('Propriedade encontrada', property);
    return property;
  }
}
