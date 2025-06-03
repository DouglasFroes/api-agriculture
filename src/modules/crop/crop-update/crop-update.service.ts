import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';
import { CropUpdateDto } from './dto/crop-update.dto';

@Injectable()
export class CropUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string, data: CropUpdateDto) {
    showLog('Iniciando atualização de cultura', { id, data });
    const crop = await this.prismaService.crop.findUnique({ where: { id } });

    if (!crop) {
      showLog('Cultura não encontrada', id);
      throw new NotFoundException('Crop not found');
    }

    const updated = await this.prismaService.crop.update({ where: { id }, data });
    showLog('Cultura atualizada com sucesso', updated);
    return updated;
  }
}
