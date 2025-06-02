import { validate } from 'class-validator';
import 'reflect-metadata';
import { PropertyUpdateDto } from './property-update.dto';

describe('PropertyUpdateDto', () => {
  it('deve ser válido com campos parciais', async () => {
    const dto = new PropertyUpdateDto();
    dto.name = 'Nova Fazenda';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser válido sem nenhum campo', async () => {
    const dto = new PropertyUpdateDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se áreas forem negativas', async () => {
    const dto = new PropertyUpdateDto();
    dto.totalArea = -1;
    dto.arableArea = -1;
    dto.vegetationArea = -1;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'totalArea')).toBe(true);
    expect(errors.some((e) => e.property === 'arableArea')).toBe(true);
    expect(errors.some((e) => e.property === 'vegetationArea')).toBe(true);
  });
});
