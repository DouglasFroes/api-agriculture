import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';
import { ProducerUpdateDto } from './dto/producer-update.dto';

@Injectable()
export class ProducerUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string, data: ProducerUpdateDto) {
    showLog('Iniciando atualização de produtor', { id, data });
    const exists = await this.prismaService.producer.findUnique({
      where: { id },
    });
    if (!exists) {
      showLog('Produtor não encontrado', id);
      throw new NotFoundException('Producer not found');
    }
    await this.prismaService.producer.update({ where: { id }, data });
    showLog('Produtor atualizado com sucesso', id);
  }
}
