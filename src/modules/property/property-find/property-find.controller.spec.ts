import { PropertyFindController } from './property-find.controller';
import { PropertyFindService } from './property-find.service';

describe('PropertyFindController', () => {
  let controller: PropertyFindController;
  let service: PropertyFindService;

  beforeEach(() => {
    service = { run: jest.fn() } as any;
    controller = new PropertyFindController(service);
  });

  it('deve chamar o service com o id correto', async () => {
    (service.run as jest.Mock).mockResolvedValue({ id: '1' });
    const result = await controller.find('1');
    expect(service.run).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1' });
  });
});
