import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';

@Injectable()
export class ProducerFindService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    showLog('Iniciando busca de produtor', id);
    const producer = await this.prismaService.producer.findUnique({
      where: { id },
      include: { properties: true },
    });

    if (!producer) {
      showLog('Produtor não encontrado', id);
      throw new NotFoundException('Producer not found');
    }

    showLog('Produtor encontrado', producer);
    return producer;
  }
}
