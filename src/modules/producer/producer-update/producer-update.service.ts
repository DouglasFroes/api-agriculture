import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ProducerUpdateDto } from './dto/producer-update.dto';

@Injectable()
export class ProducerUpdateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(id: string, data: ProducerUpdateDto) {
    const exists = await this.prismaService.producer.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Producer not found');

    await this.prismaService.producer.update({ where: { id }, data });
  }
}
