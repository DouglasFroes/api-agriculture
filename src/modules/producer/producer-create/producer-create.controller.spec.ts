import { Test, TestingModule } from '@nestjs/testing';
import { ProducerCreateController } from './producer-create.controller';
import { ProducerCreateService } from './producer-create.service';

const serviceMock = { run: jest.fn() };

describe('ProducerCreateController', () => {
  let controller: ProducerCreateController;
  let service: ProducerCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerCreateController],
      providers: [{ provide: ProducerCreateService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProducerCreateController>(ProducerCreateController);
    service = module.get<ProducerCreateService>(ProducerCreateService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service e retornar o produtor criado', async () => {
    const dto = { cpfCnpj: '123.456.789-09', name: 'Produtor Teste' };
    const created = { id: '1', cpfCnpj: '12345678909', name: 'Produtor Teste' };
    (service.run as jest.Mock).mockResolvedValue(created);
    const result = await controller.create(dto);
    expect(serviceMock.run).toHaveBeenCalledWith(dto);
    expect(result).toEqual(created);
  });
});
