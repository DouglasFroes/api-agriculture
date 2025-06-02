import { validate } from 'class-validator';
import 'reflect-metadata';
import { CropUpdateDto } from './crop-update.dto';

describe('CropUpdateDto', () => {
  it('deve ser válido com campos parciais', async () => {
    const dto = new CropUpdateDto();
    dto.name = 'Milho';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser válido sem nenhum campo', async () => {
    const dto = new CropUpdateDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se year for negativo', async () => {
    const dto = new CropUpdateDto();
    dto.year = -2025;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'year')).toBe(true);
  });
});
