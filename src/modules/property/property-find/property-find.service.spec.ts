import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { PropertyFindService } from './property-find.service';

const prismaMock = {
  property: {
    findUnique: jest.fn(),
  },
};

describe('PropertyFindService', () => {
  let service: PropertyFindService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyFindService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<PropertyFindService>(PropertyFindService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve retornar a propriedade se encontrada', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue({ id: '1' });
    const result = await service.run('1');
    expect(result).toEqual({ id: '1' });
  });

  it('deve lançar NotFoundException se não encontrada', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(service.run('1')).rejects.toThrow(NotFoundException);
  });
});
