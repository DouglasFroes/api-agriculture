import { Injectable } from '@nestjs/common';
import { Crop } from 'generated/prisma';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ResponseService } from 'src/providers/response/response.service';
import { CropListDto } from './dto/crop-list.dto';

@Injectable()
export class CropListService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly responseService: ResponseService<Crop>,
  ) {}

  async run(query: CropListDto) {
    const { page = 1, limit = 10 } = query;

    const where = {};

    if (query.name) {
      Object.assign(where, {
        name: { contains: query.name, mode: 'insensitive' },
      });
    }

    if (query.year) {
      Object.assign(where, { year: query.year });
    }

    if (query.propertyId) {
      Object.assign(where, { propertyId: query.propertyId });
    }

    const total = await this.prismaService.crop.count({
      where: where,
    });
    const result = await this.prismaService.crop.findMany({
      where: where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { name: 'desc' },
    });

    return this.responseService.pagination({
      total,
      limit,
      currentPage: page,
      data: this.viewCrop(result),
    });
  }

  viewCrop(list: Crop[]) {
    return list.map((crop) => {
      return {
        fullName: `${crop.name} na Safra ${crop.year}`,
        ...crop,
      };
    });
  }
}
