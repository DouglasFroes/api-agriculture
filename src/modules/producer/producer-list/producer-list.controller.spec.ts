import { Test, TestingModule } from '@nestjs/testing';
import { ProducerListController } from './producer-list.controller';
import { ProducerListService } from './producer-list.service';

describe('ProducerListController', () => {
  let controller: ProducerListController;
  let service: ProducerListService;
  const serviceMock = { run: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerListController],
      providers: [{ provide: ProducerListService, useValue: serviceMock }],
    }).compile();
    controller = module.get<ProducerListController>(ProducerListController);
    service = module.get<ProducerListService>(ProducerListService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service e retornar a lista', async () => {
    const query = { name: 'Produtor' };
    const resultList = [{ id: '1', name: 'Produtor' }];
    (service.run as jest.Mock).mockResolvedValue(resultList);
    const result = await controller.list(query);
    expect(serviceMock.run).toHaveBeenCalledWith(query);
    expect(result).toEqual(resultList);
  });

  it('deve lançar erro se o service lançar', async () => {
    const query = { name: 'Produtor' };
    (service.run as jest.Mock).mockRejectedValue(new Error('Erro ao listar'));
    await expect(controller.list(query)).rejects.toThrow('Erro ao listar');
    expect(serviceMock.run).toHaveBeenCalledWith(query);
  });
});
