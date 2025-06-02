import { validate } from 'class-validator';
import 'reflect-metadata';
import { CropListDto } from './crop-list.dto';

describe('CropListDto', () => {
  it('deve ser válido com todos os campos corretos', async () => {
    const dto = new CropListDto();
    dto.page = 2;
    dto.limit = 10;
    dto.name = 'Soja';
    dto.year = 2025;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser válido sem campos opcionais', async () => {
    const dto = new CropListDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se page for menor que 1', async () => {
    const dto = new CropListDto();
    dto.page = 0;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'page')).toBe(true);
  });

  it('deve ser inválido se limit for menor que 5', async () => {
    const dto = new CropListDto();
    dto.limit = 3;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'limit')).toBe(true);
  });

  it('deve ser inválido se year for negativo', async () => {
    const dto = new CropListDto();
    dto.year = -2025;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'year')).toBe(true);
  });
});
