import { PropertyDeleteController } from './property-delete.controller';
import { PropertyDeleteService } from './property-delete.service';

describe('PropertyDeleteController', () => {
  let controller: PropertyDeleteController;
  let service: PropertyDeleteService;

  beforeEach(() => {
    service = { run: jest.fn() } as any;
    controller = new PropertyDeleteController(service);
  });

  it('deve chamar o service com o id correto', async () => {
    (service.run as jest.Mock).mockResolvedValue({ id: '1' });
    const result = await controller.delete('1');
    expect(service.run).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1' });
  });
});
