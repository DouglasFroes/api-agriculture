import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';

@Injectable()
export class CropDeleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    showLog('Iniciando exclusão de cultura', id);
    const crop = await this.prismaService.crop.findUnique({ where: { id } });

    if (!crop) {
      showLog('Cultura não encontrada para exclusão', id);
      throw new NotFoundException('Crop not found');
    }

    await this.prismaService.crop.delete({ where: { id } });
    showLog('Cultura excluída com sucesso', id);
  }
}
