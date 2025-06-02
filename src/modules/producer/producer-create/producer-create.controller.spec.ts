import { Test, TestingModule } from '@nestjs/testing';
import { ProducerCreateDto } from './dto/producer-create.dto';
import { ProducerCreateController } from './producer-create.controller';
import { ProducerCreateService } from './producer-create.service';

describe('ProducerCreateController', () => {
  let controller: ProducerCreateController;
  let service: ProducerCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerCreateController],
      providers: [
        {
          provide: ProducerCreateService,
          useValue: { run: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get(ProducerCreateController);
    service = module.get(ProducerCreateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.run with correct data', async () => {
    const dto: ProducerCreateDto = {
      cpfCnpj: '12345678901',
      name: 'Produtor Teste',
    };
    const result = { id: 'uuid', ...dto };
    jest.spyOn(service, 'run').mockResolvedValue(result);
    await expect(controller.create(dto)).resolves.toEqual(result);
    expect(jest.isMockFunction(service.run)).toBe(true);
    expect((service.run as jest.Mock).mock.calls[0][0]).toEqual(dto);
  });
});
