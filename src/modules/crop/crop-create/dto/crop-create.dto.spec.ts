import { validate } from 'class-validator';
import 'reflect-metadata';
import { CropCreateDto } from './crop-create.dto';

const uuid = 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454';

describe('CropCreateDto', () => {
  it('deve ser válido com todos os campos obrigatórios', async () => {
    const dto = new CropCreateDto();
    dto.name = 'Soja';
    dto.year = 2025;
    dto.propertyId = uuid;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se faltar campos obrigatórios', async () => {
    const dto = new CropCreateDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve ser inválido se year for negativo', async () => {
    const dto = new CropCreateDto();
    dto.name = 'Soja';
    dto.year = -2025;
    dto.propertyId = uuid;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'year')).toBe(true);
  });
});
