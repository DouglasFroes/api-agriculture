import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ResponseService } from 'src/providers/response/response.service';
import { PropertyListDto } from './dto/property-list.dto';

@Injectable()
export class PropertyListService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly responseService: ResponseService<Property>,
  ) {}

  async run(query: PropertyListDto) {
    const { page = 1, limit = 10 } = query;

    const where = {};

    if (query.name) {
      Object.assign(where, {
        name: { contains: query.name, mode: 'insensitive' },
      });
    }

    if (query.city) {
      Object.assign(where, {
        city: { contains: query.city, mode: 'insensitive' },
      });
    }

    if (query.state) {
      Object.assign(where, {
        state: { contains: query.state, mode: 'insensitive' },
      });
    }

    const total = await this.prismaService.property.count({
      where: where,
    });
    const result = await this.prismaService.property.findMany({
      where: where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { name: 'desc' },
    });

    return this.responseService.pagination({
      total,
      limit,
      currentPage: page,
      data: result,
    });
  }
}
