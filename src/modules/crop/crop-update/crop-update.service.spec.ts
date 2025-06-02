import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropUpdateService } from './crop-update.service';

const prismaMock = {
  crop: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('CropUpdateService', () => {
  let service: CropUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropUpdateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<CropUpdateService>(CropUpdateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve atualizar cultura se existir', async () => {
    prismaMock.crop.findUnique.mockResolvedValue({ id: '1', name: 'Soja' });
    prismaMock.crop.update.mockResolvedValue({
      id: '1',
      name: 'Soja',
      year: 2025,
    });
    const dto = { name: 'Soja', year: 2025 };
    const result = await service.run('1', dto);
    expect(prismaMock.crop.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: dto,
    });
    expect(result).toEqual({ id: '1', name: 'Soja', year: 2025 });
  });

  it('deve lançar NotFoundException se cultura não existir', async () => {
    prismaMock.crop.findUnique.mockResolvedValue(null);
    await expect(
      service.run('1', { name: 'Soja', year: 2025 }),
    ).rejects.toThrow(NotFoundException);
    expect(prismaMock.crop.update).not.toHaveBeenCalled();
  });
});
