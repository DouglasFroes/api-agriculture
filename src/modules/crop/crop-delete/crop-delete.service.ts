import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class CropDeleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    const crop = await this.prismaService.crop.findUnique({ where: { id } });
    if (!crop) throw new NotFoundException('Crop not found');
    return this.prismaService.crop.delete({ where: { id } });
  }
}
