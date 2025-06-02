import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ProducerCreateDto } from './dto/producer-create.dto';

@Injectable()
export class ProducerCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: ProducerCreateDto) {
    const isExisted = await this.prismaService.producer.findFirst({
      where: { cpfCnpj: data.cpfCnpj },
    });

    if (isExisted) {
      throw new BadRequestException('this CPF or CNPJ already exists');
    }

    return await this.prismaService.producer.create({
      data: {
        cpfCnpj: data.cpfCnpj,
        name: data.name,
      },
    });
  }
}
