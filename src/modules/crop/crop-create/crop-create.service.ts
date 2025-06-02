import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropCreateDto } from './dto/crop-create.dto';

@Injectable()
export class CropCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: CropCreateDto) {
    const isExisted = await this.prismaService.crop.findFirst({
      where: {
        name: data.name,
        year: data.year,
        propertyId: data.propertyId,
      },
    });

    if (isExisted) {
      throw new BadRequestException(
        'Crop with this name and year already exists for this property',
      );
    }

    return this.prismaService.crop.create({
      data: {
        name: data.name,
        year: data.year,
        propertyId: data.propertyId,
      },
    });
  }
}
