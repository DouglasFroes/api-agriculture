import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ResponseService } from 'src/providers/response/response.service';
import { PropertyListDto } from './dto/property-list.dto';
import { PropertyListService } from './property-list.service';

const prismaMock = {
  property: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
};
const responseMock = {
  pagination: jest.fn(),
};

describe('PropertyListService', () => {
  let service: PropertyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyListService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: ResponseService, useValue: responseMock },
      ],
    }).compile();
    service = module.get<PropertyListService>(PropertyListService);
  });

  it('deve retornar propriedades paginadas', async () => {
    prismaMock.property.findMany.mockResolvedValue([{ id: '1' }]);
    prismaMock.property.count.mockResolvedValue(1);
    responseMock.pagination.mockResolvedValue({
      data: [{ id: '1' }],
      total: 1,
    });
    const dto: PropertyListDto = { page: 1, limit: 10 };
    const result = await service.run(dto);
    expect(result.data.length).toBe(1);
    expect(result.total).toBe(1);
  });
});
