import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ResponseService } from 'src/providers/response/response.service';
import { ProducerListService } from './producer-list.service';

const prisma = {
  producer: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
};

const responseService = {
  pagination: jest.fn(),
};

describe('ProducerListService', () => {
  let service: ProducerListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerListService,
        { provide: PrismaService, useValue: prisma },
        { provide: ResponseService, useValue: responseService },
      ],
    }).compile();

    service = module.get<ProducerListService>(ProducerListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar a lista paginada', async () => {
    prisma.producer.count.mockResolvedValue(1);
    prisma.producer.findMany.mockResolvedValue([{ id: '1', name: 'Produtor' }]);
    responseService.pagination.mockReturnValue('paginated');
    const query = { name: 'Produtor', page: 1, limit: 10 };
    const result = await service.run(query);
    expect(prisma.producer.count).toHaveBeenCalled();
    expect(prisma.producer.findMany).toHaveBeenCalled();
    expect(responseService.pagination).toHaveBeenCalledWith({
      total: 1,
      limit: 10,
      currentPage: 1,
      data: [{ id: '1', name: 'Produtor' }],
    });
    expect(result).toBe('paginated');
  });

  it('deve filtrar por nome', async () => {
    prisma.producer.count.mockResolvedValue(1);
    prisma.producer.findMany.mockResolvedValue([{ id: '1', name: 'Produtor' }]);
    responseService.pagination.mockReturnValue('paginated');
    const query = { name: 'Teste' };
    await service.run(query);
    expect(prisma.producer.count).toHaveBeenCalledWith({
      where: { name: { contains: 'Teste', mode: 'insensitive' } },
    });
    expect(prisma.producer.findMany).toHaveBeenCalled();
  });

  it('deve lançar erro se responseService lançar', async () => {
    prisma.producer.count.mockResolvedValue(1);
    prisma.producer.findMany.mockResolvedValue([{ id: '1', name: 'Produtor' }]);
    responseService.pagination.mockImplementation(() => {
      throw new Error('Erro');
    });
    const query = { name: 'Produtor' };
    await expect(service.run(query)).rejects.toThrow('Erro');
  });
});
