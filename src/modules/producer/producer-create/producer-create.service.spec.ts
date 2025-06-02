import { Test, TestingModule } from '@nestjs/testing';
import { ProducerCreateService } from './producer-create.service';

describe('ProducerCreateService', () => {
  let service: ProducerCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerCreateService],
    }).compile();

    service = module.get<ProducerCreateService>(ProducerCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
