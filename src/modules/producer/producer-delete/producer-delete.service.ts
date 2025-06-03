import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';

@Injectable()
export class ProducerDeleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    showLog('Iniciando exclusão de produtor', id);
    const exists = await this.prismaService.producer.findUnique({
      where: { id },
    });

    if (!exists) {
      showLog('Produtor não encontrado para exclusão', id);
      throw new NotFoundException('Producer not found');
    }

    await this.prismaService.producer.delete({ where: { id } });
    showLog('Produtor excluído com sucesso', id);
  }
}
