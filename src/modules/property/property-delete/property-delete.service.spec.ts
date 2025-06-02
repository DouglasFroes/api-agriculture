import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { PropertyDeleteService } from './property-delete.service';

const prismaMock = {
  property: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PropertyDeleteService', () => {
  let service: PropertyDeleteService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyDeleteService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<PropertyDeleteService>(PropertyDeleteService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve deletar se propriedade existir', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue({ id: '1' });
    (prisma.property.delete as jest.Mock).mockResolvedValue({ id: '1' });
    const result = await service.run('1');
    expect(result).toEqual({ id: '1' });
  });

  it('deve lançar NotFoundException se não existir', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(service.run('1')).rejects.toThrow(NotFoundException);
  });
});
