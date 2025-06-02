import { Test, TestingModule } from '@nestjs/testing';
import { ProducerDeleteController } from './producer-delete.controller';
import { ProducerDeleteService } from './producer-delete.service';

const serviceMock = { run: jest.fn() };

describe('ProducerDeleteController', () => {
  let controller: ProducerDeleteController;
  let service: ProducerDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerDeleteController],
      providers: [{ provide: ProducerDeleteService, useValue: serviceMock }],
    }).compile();
    controller = module.get<ProducerDeleteController>(ProducerDeleteController);
    service = module.get<ProducerDeleteService>(ProducerDeleteService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve deletar um produtor com sucesso', async () => {
    const id = 'b3b8e2e2-1c2d-4e2a-8e2a-1b2c3d4e5f6a';
    const deleted = { id, deleted: true };
    (service.run as jest.Mock).mockResolvedValue(deleted);
    const result = await controller.delete(id);
    expect(serviceMock.run).toHaveBeenCalledWith(id);
    expect(result).toEqual(deleted);
  });

  it('deve lançar erro se o service lançar', async () => {
    const id = 'b3b8e2e2-1c2d-4e2a-8e2a-1b2c3d4e5f6a';
    (service.run as jest.Mock).mockRejectedValue(new Error('Not found'));
    await expect(controller.delete(id)).rejects.toThrow('Not found');
    expect(serviceMock.run).toHaveBeenCalledWith(id);
  });
});
