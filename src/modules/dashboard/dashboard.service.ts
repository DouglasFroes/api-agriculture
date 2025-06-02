import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async totalFarms() {
    return this.prisma.property.count();
  }

  async totalHectares() {
    const result = await this.prisma.property.aggregate({
      _sum: { totalArea: true },
    });
    return result._sum.totalArea || 0;
  }

  async farmsByState() {
    return this.prisma.property.groupBy({
      by: ['state'],
      _count: { _all: true },
    });
  }

  async cropsByName() {
    return this.prisma.crop.groupBy({
      by: ['name'],
      _count: { _all: true },
    });
  }

  async landUse() {
    const result = await this.prisma.property.aggregate({
      _sum: { arableArea: true, vegetationArea: true },
    });
    return {
      arableArea: result._sum.arableArea || 0,
      vegetationArea: result._sum.vegetationArea || 0,
    };
  }

  async dashboardMetrics() {
    const results = await Promise.all([
      this.totalFarms(),
      this.totalHectares(),
      this.farmsByState(),
      this.cropsByName(),
      this.landUse(),
    ]);
    const totalFarms = results[0];
    const totalHectares = results[1];
    const farmsByState = results[2];
    const cropsByName = results[3];
    const landUse = results[4];
    return {
      totalFarms,
      totalHectares,
      farmsByState,
      cropsByName,
      landUse,
    };
  }
}
