import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class PropertyFindService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    const property = await this.prismaService.property.findUnique({ where: { id } });
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }
}
