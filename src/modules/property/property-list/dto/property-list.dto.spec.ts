import { validate } from 'class-validator';
import 'reflect-metadata';
import { PropertyListDto } from './property-list.dto';

describe('PropertyListDto', () => {
  it('deve ser válido com todos os campos corretos', async () => {
    const dto = new PropertyListDto();
    dto.page = 2;
    dto.limit = 10;
    dto.name = 'Fazenda';
    dto.city = 'Uberlândia';
    dto.state = 'MG';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser válido sem campos opcionais', async () => {
    const dto = new PropertyListDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se page for menor que 1', async () => {
    const dto = new PropertyListDto();
    dto.page = 0;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'page')).toBe(true);
  });

  it('deve ser inválido se limit for menor que 5', async () => {
    const dto = new PropertyListDto();
    dto.limit = 3;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'limit')).toBe(true);
  });

  it('deve ser inválido se name não for string', async () => {
    const dto = new PropertyListDto();
    // @ts-expect-error: Testando atribuição inválida propositalmente
    dto.name = 123;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });
});
