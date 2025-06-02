import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { PropertyCreateDto } from './dto/property-create.dto';

@Injectable()
export class PropertyCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: PropertyCreateDto) {
    if (data.arableArea + data.vegetationArea > data.totalArea) {
      throw new BadRequestException(
        'The sum of arable and vegetation areas cannot exceed the total area',
      );
    }

    return await this.prismaService.property.create({
      data: {
        name: data.name,
        city: data.city,
        state: data.state,
        totalArea: data.totalArea,
        arableArea: data.arableArea,
        vegetationArea: data.vegetationArea,
        producerId: data.producerId,
      },
    });
  }
}
