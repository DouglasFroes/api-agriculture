import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';
import { CropCreateDto } from './dto/crop-create.dto';

@Injectable()
export class CropCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: CropCreateDto) {
    showLog('Iniciando criação de cultura', data);
    const isExisted = await this.prismaService.crop.findFirst({
      where: {
        name: data.name,
        year: data.year,
        propertyId: data.propertyId,
      },
    });

    if (isExisted) {
      showLog('Cultura já existe para esta propriedade/ano', data);
      throw new BadRequestException(
        'Crop with this name and year already exists for this property',
      );
    }

    const created = await this.prismaService.crop.create({
      data: {
        name: data.name,
        year: data.year,
        propertyId: data.propertyId,
      },
    });
    showLog('Cultura criada com sucesso', created);
    return created;
  }
}
