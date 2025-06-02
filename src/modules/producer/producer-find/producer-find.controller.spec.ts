import { Test, TestingModule } from '@nestjs/testing';
import { ProducerFindDto } from './dto/producer-find.dto';
import { ProducerFindController } from './producer-find.controller';
import { ProducerFindService } from './producer-find.service';

describe('ProducerFindController', () => {
  let controller: ProducerFindController;
  let service: ProducerFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerFindController],
      providers: [
        {
          provide: ProducerFindService,
          useValue: { run: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get(ProducerFindController);
    service = module.get(ProducerFindService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.run with correct query', async () => {
    const query: ProducerFindDto = {
      cpfCnpj: '12345678901',
      name: 'Produtor Teste',
    };
    const result = [{ id: 'uuid', ...query }];
    jest.spyOn(service, 'run').mockResolvedValue(result);
    await expect(controller.find(query)).resolves.toEqual(result);
  });
});
