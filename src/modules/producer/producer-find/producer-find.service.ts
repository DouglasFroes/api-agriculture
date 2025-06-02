import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class ProducerFindService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string) {
    const producer = await this.prismaService.producer.findUnique({
      where: { id },
    });

    if (!producer) {
      throw new Error('Producer not found');
    }

    return producer;
  }
}
