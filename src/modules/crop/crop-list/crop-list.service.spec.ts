import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ResponseService } from 'src/providers/response/response.service';
import { CropListService } from './crop-list.service';

const prismaMock = {
  crop: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
};
const responseMock = {
  pagination: jest.fn(),
};

describe('CropListService', () => {
  let service: CropListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropListService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: ResponseService, useValue: responseMock },
      ],
    }).compile();
    service = module.get<CropListService>(CropListService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar culturas paginadas', async () => {
    prismaMock.crop.findMany.mockResolvedValue([
      { id: '1', name: 'Soja', year: 2025 },
    ]);
    prismaMock.crop.count.mockResolvedValue(1);
    responseMock.pagination.mockReturnValue({
      data: [
        { id: '1', name: 'Soja', year: 2025, fullName: 'Soja  na Safra 2025' },
      ],
      total: 1,
    });
    const dto = { page: 1, limit: 10 };
    const result = await service.run(dto);
    expect(result.data.length).toBe(1);
    expect(result.total).toBe(1);
  });
});
