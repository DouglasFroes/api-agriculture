import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class ProducerDeleteService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    const exists = await this.prismaService.producer.findUnique({
      where: { id },
    });

    if (!exists) throw new NotFoundException('Producer not found');

    await this.prismaService.producer.delete({ where: { id } });
  }
}
