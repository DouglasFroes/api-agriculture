import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ProducerDeleteService } from './producer-delete.service';

describe('ProducerDeleteService', () => {
  let service: ProducerDeleteService;
  let prisma: { producer: { findUnique: jest.Mock; delete: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      producer: {
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerDeleteService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = module.get<ProducerDeleteService>(ProducerDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve deletar um produtor existente', async () => {
    prisma.producer.findUnique.mockResolvedValue({ id: '1' });
    prisma.producer.delete.mockResolvedValue(undefined);
    await expect(service.run('1')).resolves.toBeUndefined();
    expect(prisma.producer.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(prisma.producer.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('deve lançar erro se produtor não existir', async () => {
    prisma.producer.findUnique.mockResolvedValue(null);
    await expect(service.run('1')).rejects.toThrow(NotFoundException);
    expect(prisma.producer.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(prisma.producer.delete).not.toHaveBeenCalled();
  });
});
