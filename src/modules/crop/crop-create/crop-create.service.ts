import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropCreateDto } from './dto/crop-create.dto';

@Injectable()
export class CropCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: CropCreateDto) {
    return this.prismaService.crop.create({
      data: {
        name: data.name,
        season: data.season,
        propertyId: data.propertyId,
      },
    });
  }
}
