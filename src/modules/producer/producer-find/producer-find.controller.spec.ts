import { Test, TestingModule } from '@nestjs/testing';
import { ProducerFindController } from './producer-find.controller';
import { ProducerFindService } from './producer-find.service';

describe('ProducerFindController', () => {
  let controller: ProducerFindController;
  let service: ProducerFindService;
  const serviceMock = { run: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerFindController],
      providers: [{ provide: ProducerFindService, useValue: serviceMock }],
    }).compile();
    controller = module.get<ProducerFindController>(ProducerFindController);
    service = module.get<ProducerFindService>(ProducerFindService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar o produtor encontrado', async () => {
    const id = 'b3b8e2e2-1c2d-4e2a-8e2a-1b2c3d4e5f6a';
    const found = { id, name: 'Produtor Teste' };
    (service.run as jest.Mock).mockResolvedValue(found);
    const result = await controller.find(id);
    expect(serviceMock.run).toHaveBeenCalledWith(id);
    expect(result).toEqual(found);
  });

  it('deve lançar erro se o service lançar', async () => {
    const id = 'b3b8e2e2-1c2d-4e2a-8e2a-1b2c3d4e5f6a';
    (service.run as jest.Mock).mockRejectedValue(new Error('Not found'));
    await expect(controller.find(id)).rejects.toThrow('Not found');
    expect(serviceMock.run).toHaveBeenCalledWith(id);
  });
});
