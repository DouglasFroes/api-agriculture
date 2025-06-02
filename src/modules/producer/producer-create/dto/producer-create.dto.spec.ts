import { validate } from 'class-validator';
import { ProducerCreateDto } from './producer-create.dto';

describe('ProducerCreateDto', () => {
  it('deve ser válido com dados corretos', async () => {
    const dto = new ProducerCreateDto();
    dto.cpfCnpj = '529.982.247-25'; // CPF válido
    dto.name = 'Produtor Teste';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
  it('deve ser inválido se cpfCnpj estiver vazio', async () => {
    const dto = new ProducerCreateDto();
    dto.cpfCnpj = '';
    dto.name = 'Produtor Teste';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'cpfCnpj')).toBe(true);
  });

  it('deve ser inválido se name estiver vazio', async () => {
    const dto = new ProducerCreateDto();
    dto.cpfCnpj = '123.456.789-09';
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });
});
