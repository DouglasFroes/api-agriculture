import { Injectable } from '@nestjs/common';
import { Producer } from 'generated/prisma';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ResponseService } from 'src/providers/response/response.service';
import { producerListDto } from './dto/producer-list.dto';

@Injectable()
export class ProducerListService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly responseService: ResponseService<Producer>,
  ) {}

  async run(query: producerListDto) {
    const { name, page = 1, limit = 10 } = query;

    const where = {};

    if (name) {
      Object.assign(where, { name: { contains: name, mode: 'insensitive' } });
    }

    const total = await this.prismaService.producer.count({
      where: where,
    });
    const producers = await this.prismaService.producer.findMany({
      where: where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { name: 'desc' },
    });

    return this.responseService.pagination({
      total,
      limit,
      currentPage: page,
      data: producers,
    });
  }
}
