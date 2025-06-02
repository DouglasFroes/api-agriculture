import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropUpdateDto } from './dto/crop-update.dto';

@Injectable()
export class CropUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string, data: CropUpdateDto) {
    const crop = await this.prismaService.crop.findUnique({ where: { id } });
    if (!crop) throw new NotFoundException('Crop not found');
    return this.prismaService.crop.update({ where: { id }, data });
  }
}
