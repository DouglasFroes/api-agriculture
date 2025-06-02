import { validate } from 'class-validator';
import 'reflect-metadata';
import { PropertyCreateDto } from './property-create.dto';

describe('PropertyCreateDto', () => {
  it('deve ser válido com todos os campos obrigatórios', async () => {
    const dto = new PropertyCreateDto();
    dto.name = 'Fazenda Boa Vista';
    dto.city = 'Uberlândia';
    dto.state = 'MG';
    dto.totalArea = 100;
    dto.arableArea = 60;
    dto.vegetationArea = 40;
    dto.producerId = 'uuid-producer';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se faltar campos obrigatórios', async () => {
    const dto = new PropertyCreateDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve ser inválido se áreas forem negativas', async () => {
    const dto = new PropertyCreateDto();
    dto.name = 'Fazenda';
    dto.city = 'Cidade';
    dto.state = 'UF';
    dto.totalArea = -1;
    dto.arableArea = -1;
    dto.vegetationArea = -1;
    dto.producerId = 'uuid-producer';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'totalArea')).toBe(true);
    expect(errors.some((e) => e.property === 'arableArea')).toBe(true);
    expect(errors.some((e) => e.property === 'vegetationArea')).toBe(true);
  });
});
