import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class ProducerFindService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    const producer = await this.prismaService.producer.findUnique({
      where: { id },
      include: { properties: true },
    });

    if (!producer) {
      throw new NotFoundException('Producer not found');
    }

    return producer;
  }
}
