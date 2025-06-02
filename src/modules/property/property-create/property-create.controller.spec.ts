import { PropertyCreateDto } from './dto/property-create.dto';
import { PropertyCreateController } from './property-create.controller';
import { PropertyCreateService } from './property-create.service';

describe('PropertyCreateController', () => {
  let controller: PropertyCreateController;
  let service: PropertyCreateService;

  beforeEach(() => {
    service = { run: jest.fn() } as any;
    controller = new PropertyCreateController(service);
  });

  it('deve chamar o service com o DTO correto', async () => {
    const dto = {
      name: 'Fazenda',
      city: 'Cidade',
      state: 'UF',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      producerId: 'uuid-produtor',
    };
    (service.run as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    const result = await controller.create(dto as PropertyCreateDto);
    expect(service.run).toHaveBeenCalledWith(dto);
    expect(result).toMatchObject(dto);
  });
});
