import { Test, TestingModule } from '@nestjs/testing';
import { ProducerUpdateController } from './producer-update.controller';
import { ProducerUpdateService } from './producer-update.service';

describe('ProducerUpdateController', () => {
  let controller: ProducerUpdateController;
  let service: ProducerUpdateService;
  const serviceMock = { run: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerUpdateController],
      providers: [{ provide: ProducerUpdateService, useValue: serviceMock }],
    }).compile();
    controller = module.get<ProducerUpdateController>(ProducerUpdateController);
    service = module.get<ProducerUpdateService>(ProducerUpdateService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve atualizar um produtor com sucesso', async () => {
    const id = 'b3b8e2e2-1c2d-4e2a-8e2a-1b2c3d4e5f6a';
    const dto = { name: 'Novo Nome' };
    const updated = { id, ...dto };
    (service.run as jest.Mock).mockResolvedValue(updated);
    const result = await controller.update(id, dto);
    expect(serviceMock.run).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updated);
  });

  it('deve lançar erro se o service lançar', async () => {
    const id = 'b3b8e2e2-1c2d-4e2a-8e2a-1b2c3d4e5f6a';
    const dto = { name: 'Novo Nome' };
    (service.run as jest.Mock).mockRejectedValue(new Error('Not found'));
    await expect(controller.update(id, dto)).rejects.toThrow('Not found');
    expect(serviceMock.run).toHaveBeenCalledWith(id, dto);
  });
});
