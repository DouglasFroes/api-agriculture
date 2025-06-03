import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { showLog } from 'src/utils/showLog';
import { ProducerCreateDto } from './dto/producer-create.dto';

@Injectable()
export class ProducerCreateService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(data: ProducerCreateDto) {
    showLog('Iniciando criação de produtor', data);
    const cpfCnpj = data.cpfCnpj.replace(/\D/g, '');
    const isExisted = await this.prismaService.producer.findFirst({
      where: { cpfCnpj },
    });

    if (isExisted) {
      showLog('CPF ou CNPJ já existe', cpfCnpj);
      throw new BadRequestException('this CPF or CNPJ already exists');
    }

    const created = await this.prismaService.producer.create({
      data: {
        cpfCnpj,
        name: data.name,
      },
    });
    showLog('Produtor criado com sucesso', created);
    return created;
  }
}
