import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ProducerUpdateService } from './producer-update.service';

describe('ProducerUpdateService', () => {
  let service: ProducerUpdateService;
  let prisma: { producer: { findUnique: jest.Mock; update: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      producer: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerUpdateService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = module.get<ProducerUpdateService>(ProducerUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve atualizar um produtor existente', async () => {
    prisma.producer.findUnique.mockResolvedValue({ id: '1' });
    prisma.producer.update.mockResolvedValue(undefined);
    const dto = { name: 'Novo Nome' };
    await expect(service.run('1', dto)).resolves.toBeUndefined();
    expect(prisma.producer.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(prisma.producer.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: dto,
    });
  });

  it('deve lançar erro se produtor não existir', async () => {
    prisma.producer.findUnique.mockResolvedValue(null);
    const dto = { name: 'Novo Nome' };
    await expect(service.run('1', dto)).rejects.toThrow(NotFoundException);
    expect(prisma.producer.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(prisma.producer.update).not.toHaveBeenCalled();
  });
});
