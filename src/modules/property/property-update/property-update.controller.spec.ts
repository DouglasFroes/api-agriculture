import { PropertyUpdateDto } from './dto/property-update.dto';
import { PropertyUpdateController } from './property-update.controller';
import { PropertyUpdateService } from './property-update.service';

describe('PropertyUpdateController', () => {
  let controller: PropertyUpdateController;
  let service: PropertyUpdateService;

  beforeEach(() => {
    service = { run: jest.fn() } as any;
    controller = new PropertyUpdateController(service);
  });

  it('deve chamar o service com id e DTO corretos', async () => {
    const dto: PropertyUpdateDto = { name: 'Nova Fazenda' };
    (service.run as jest.Mock).mockResolvedValue(undefined);
    await controller.update('1', dto);
    expect(service.run).toHaveBeenCalledWith('1', dto);
  });
});
