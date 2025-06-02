import { PropertyListDto } from './dto/property-list.dto';
import { PropertyListController } from './property-list.controller';
import { PropertyListService } from './property-list.service';

describe('PropertyListController', () => {
  let controller: PropertyListController;
  let service: PropertyListService;

  beforeEach(() => {
    service = { run: jest.fn() } as any;
    controller = new PropertyListController(service);
  });

  it('deve chamar o service com o DTO correto', async () => {
    const dto = { page: 1, limit: 10 };
    (service.run as jest.Mock).mockResolvedValue({
      data: [],
      meta: { total: 0 },
    });
    const result = await controller.list(dto as PropertyListDto);
    expect(service.run).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('data');
  });
});
