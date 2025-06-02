import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ProducerFindService } from './producer-find.service';

describe('ProducerFindService', () => {
  let service: ProducerFindService;
  let prisma: { producer: { findUnique: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      producer: {
        findUnique: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerFindService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = module.get<ProducerFindService>(ProducerFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar o produtor encontrado', async () => {
    const id = 'abc-123';
    const producer = { id, name: 'Produtor', properties: [] };
    prisma.producer.findUnique.mockResolvedValue(producer);
    const result = await service.run(id);
    expect(prisma.producer.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: { properties: true },
    });
    expect(result).toEqual(producer);
  });

  it('deve lançar erro se produtor não encontrado', async () => {
    const id = 'abc-123';
    prisma.producer.findUnique.mockResolvedValue(null);
    await expect(service.run(id)).rejects.toThrow('Producer not found');
    expect(prisma.producer.findUnique).toHaveBeenCalledWith({
      where: { id },
      include: { properties: true },
    });
  });
});
