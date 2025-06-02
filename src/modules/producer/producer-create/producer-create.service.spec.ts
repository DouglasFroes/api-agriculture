import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../providers/database/PrismaService';
import { ProducerCreateService } from './producer-create.service';

const prismaMock = {
  producer: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe('ProducerCreateService', () => {
  let service: ProducerCreateService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerCreateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<ProducerCreateService>(ProducerCreateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
