import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { DashboardDto } from './dto/dashboar.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async totalFarms(query: DashboardDto) {
    return this.prisma.property.count({
      where: {
        state: query.state,
        city: query.city,
        producerId: query.producerId,
      },
    });
  }

  async totalHectares(query: DashboardDto) {
    const result = await this.prisma.property.aggregate({
      _sum: { totalArea: true },
      where: {
        state: query.state,
        city: query.city,
        producerId: query.producerId,
      },
    });
    return result._sum.totalArea || 0;
  }

  async farmsByState(producerId?: string) {
    return this.prisma.property.groupBy({
      by: ['state'],
      _count: { _all: true },
      where: { producerId },
    });
  }

  async cropsByName(query: DashboardDto) {
    return this.prisma.crop.groupBy({
      by: ['name'],
      _count: { _all: true },
      where: {
        year: query.year,
        propertyId: query.propertyId,
      },
    });
  }

  async landUse(query: DashboardDto) {
    const result = await this.prisma.property.aggregate({
      _sum: { arableArea: true, vegetationArea: true },
      where: {
        state: query.state,
        city: query.city,
        producerId: query.producerId,
      },
    });
    return {
      arableArea: result._sum.arableArea || 0,
      vegetationArea: result._sum.vegetationArea || 0,
    };
  }

  async dashboardMetrics(query: DashboardDto) {
    const totalFarms = await this.totalFarms(query);
    const totalHectares = await this.totalHectares(query);
    const farmsByState = await this.farmsByState(query.propertyId);
    const cropsByName = await this.cropsByName(query);
    const landUse = await this.landUse(query);
    return {
      totalFarms,
      totalHectares,
      farmsByState,
      cropsByName,
      landUse,
    };
  }
}
