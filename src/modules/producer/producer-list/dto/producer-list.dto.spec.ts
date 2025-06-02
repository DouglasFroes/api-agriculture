import { validate } from 'class-validator';
import 'reflect-metadata';
import { producerListDto } from './producer-list.dto';

describe('producerListDto', () => {
  it('deve ser válido com todos os campos corretos', async () => {
    const dto = new producerListDto();
    dto.page = 2;
    dto.limit = 10;
    dto.name = 'Teste';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser válido sem campos opcionais', async () => {
    const dto = new producerListDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se page for menor que 1', async () => {
    const dto = new producerListDto();
    dto.page = 0;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'page')).toBe(true);
  });

  it('deve ser inválido se limit for menor que 5', async () => {
    const dto = new producerListDto();
    dto.limit = 3;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'limit')).toBe(true);
  });

  it('deve ser inválido se name não for string', async () => {
    const dto = new producerListDto();
    // @ts-expect-error: Testando atribuição inválida propositalmente
    dto.name = 123;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });
});
