import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class PropertyListService {
  constructor(private readonly prismaService: PrismaService) {}

  async run() {
    return this.prismaService.property.findMany();
  }
}
