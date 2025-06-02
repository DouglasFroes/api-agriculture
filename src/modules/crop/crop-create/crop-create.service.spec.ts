import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { CropCreateService } from './crop-create.service';

const prismaMock = {
  crop: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe('CropCreateService', () => {
  let service: CropCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropCreateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<CropCreateService>(CropCreateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma cultura com sucesso', async () => {
    const dto = {
      name: 'Soja',
      year: 2025,
      propertyId: 'property-uuid',
    };
    prismaMock.crop.findFirst.mockResolvedValue(null);
    prismaMock.crop.create.mockResolvedValue({
      id: '1',
      ...dto,
    });
    const result = await service.run(dto);
    expect(prismaMock.crop.findFirst).toHaveBeenCalledWith({
      where: { name: 'Soja', year: 2025, propertyId: 'property-uuid' },
    });
    expect(prismaMock.crop.create).toHaveBeenCalledWith({
      data: { name: 'Soja', year: 2025, propertyId: 'property-uuid' },
    });
    expect(result).toEqual({ id: '1', ...dto });
  });

  it('deve lançar erro se cultura já existir para o mesmo ano e propriedade', async () => {
    const dto = {
      name: 'Soja',
      year: 2025,
      propertyId: 'property-uuid',
    };
    prismaMock.crop.findFirst.mockResolvedValue({
      id: '1',
      ...dto,
    });
    await expect(service.run(dto)).rejects.toThrow(BadRequestException);
    expect(prismaMock.crop.findFirst).toHaveBeenCalledWith({
      where: { name: 'Soja', year: 2025, propertyId: 'property-uuid' },
    });
    expect(prismaMock.crop.create).not.toHaveBeenCalled();
  });
});
