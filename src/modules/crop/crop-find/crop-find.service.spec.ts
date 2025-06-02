import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropFindService } from './crop-find.service';

const prismaMock = {
  crop: {
    findUnique: jest.fn(),
  },
};

describe('CropFindService', () => {
  let service: CropFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropFindService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<CropFindService>(CropFindService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar a cultura se encontrada', async () => {
    prismaMock.crop.findUnique.mockResolvedValue({
      id: '1',
      name: 'Soja',
      year: 2025,
    });
    const result = await service.run('1');
    expect(result).toEqual({
      id: '1',
      name: 'Soja',
      year: 2025,
      fullName: 'Soja  na Safra 2025',
    });
  });

  it('deve lançar NotFoundException se não encontrada', async () => {
    prismaMock.crop.findUnique.mockResolvedValue(null);
    await expect(service.run('1')).rejects.toThrow(NotFoundException);
  });
});
