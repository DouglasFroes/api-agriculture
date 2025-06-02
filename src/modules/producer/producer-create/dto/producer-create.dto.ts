import { IsNotEmpty, IsString } from 'class-validator';
import { IsCpfCnpj } from 'src/utils/IsCpfCnpj';

export class ProducerCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsCpfCnpj()
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
