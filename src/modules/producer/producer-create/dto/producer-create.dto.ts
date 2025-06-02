import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { validateCpfCnpj } from 'src/utils/validateCpfCnpj';

export class ProducerCreateDto {
  @IsString()
  @IsNotEmpty()
  @Validate(validateCpfCnpj, { message: 'Invalid CPF or CNPJ format' })
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
