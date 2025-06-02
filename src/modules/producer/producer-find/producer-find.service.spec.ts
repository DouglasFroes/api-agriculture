import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ProducerFindDto } from './dto/producer-find.dto';
import { ProducerFindService } from './producer-find.service';

describe('ProducerFindService', () => {
  let service: ProducerFindService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerFindService,
        {
          provide: PrismaService,
          useValue: { producer: { findMany: jest.fn() } },
        },
      ],
    }).compile();
    service = module.get(ProducerFindService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.producer.findMany with correct where', async () => {
    const query: ProducerFindDto = {
      cpfCnpj: '12345678901',
      name: 'Produtor Teste',
    };
    const expectedWhere = {
      cpfCnpj: '12345678901',
      name: { contains: 'Produtor Teste', mode: 'insensitive' },
    };
    const result = [{ id: 'uuid', ...query }];
    (prisma.producer.findMany as jest.Mock).mockResolvedValue(result);
    await expect(service.run(query)).resolves.toEqual(result);
    expect(prisma.producer.findMany).toHaveBeenCalledWith({
      where: expectedWhere,
    });
  });
});
