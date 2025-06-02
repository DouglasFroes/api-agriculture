import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../providers/database/PrismaService';
import { ProducerCreateService } from './producer-create.service';

const prismaMock = {
  producer: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe('ProducerCreateService', () => {
  let service: ProducerCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerCreateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProducerCreateService>(ProducerCreateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um produtor com sucesso', async () => {
    const dto = {
      cpfCnpj: '123.456.789-09',
      name: 'Produtor Teste',
    };
    const now = new Date();
    prismaMock.producer.findFirst.mockResolvedValue(null);
    prismaMock.producer.create.mockResolvedValue({
      id: '1',
      cpfCnpj: '12345678909',
      name: 'Produtor Teste',
      createdAt: now,
      updatedAt: now,
    });

    const result = await service.run(dto);
    expect(prismaMock.producer.findFirst).toHaveBeenCalledWith({
      where: { cpfCnpj: '12345678909' },
    });
    expect(prismaMock.producer.create).toHaveBeenCalledWith({
      data: { cpfCnpj: '12345678909', name: 'Produtor Teste' },
    });
    expect(result).toEqual({
      id: '1',
      cpfCnpj: '12345678909',
      name: 'Produtor Teste',
      createdAt: now,
      updatedAt: now,
    });
  });

  it('deve lançar erro se CPF/CNPJ já existir', async () => {
    const dto = {
      cpfCnpj: '123.456.789-09',
      name: 'Produtor Teste',
    };
    const now = new Date();
    prismaMock.producer.findFirst.mockResolvedValue({
      id: '1',
      cpfCnpj: '12345678909',
      name: 'Produtor Teste',
      createdAt: now,
      updatedAt: now,
    });

    await expect(service.run(dto)).rejects.toThrow();
    expect(prismaMock.producer.findFirst).toHaveBeenCalledWith({
      where: { cpfCnpj: '12345678909' },
    });
    expect(prismaMock.producer.create).not.toHaveBeenCalled();
  });
});
