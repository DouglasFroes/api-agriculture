import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-farms')
  async totalFarms() {
    return { totalFarms: await this.dashboardService.totalFarms() };
  }

  @Get('total-hectares')
  async totalHectares() {
    return { totalHectares: await this.dashboardService.totalHectares() };
  }

  @Get('farms-by-state')
  async farmsByState() {
    return await this.dashboardService.farmsByState();
  }

  @Get('crops-by-name')
  async cropsByName() {
    return await this.dashboardService.cropsByName();
  }

  @Get('land-use')
  async landUse() {
    return await this.dashboardService.landUse();
  }
}
