import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropDeleteService } from './crop-delete.service';

const prismaMock = {
  crop: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CropDeleteService', () => {
  let service: CropDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropDeleteService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<CropDeleteService>(CropDeleteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve deletar cultura se existir', async () => {
    prismaMock.crop.findUnique.mockResolvedValue({ id: '1', name: 'Soja' });
    prismaMock.crop.delete.mockResolvedValue({ id: '1', name: 'Soja' });
    const result = await service.run('1');
    expect(prismaMock.crop.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual({ id: '1', name: 'Soja' });
  });

  it('deve lançar NotFoundException se cultura não existir', async () => {
    prismaMock.crop.findUnique.mockResolvedValue(null);
    await expect(service.run('1')).rejects.toThrow(NotFoundException);
    expect(prismaMock.crop.delete).not.toHaveBeenCalled();
  });
});
