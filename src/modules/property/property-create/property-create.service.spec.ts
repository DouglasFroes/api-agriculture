import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { PropertyCreateDto } from './dto/property-create.dto';
import { PropertyCreateService } from './property-create.service';

const prismaMock = {
  property: {
    create: jest.fn(),
  },
};

describe('PropertyCreateService', () => {
  let service: PropertyCreateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyCreateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = module.get<PropertyCreateService>(PropertyCreateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve criar uma propriedade com dados válidos', async () => {
    const dto: PropertyCreateDto = {
      name: 'Fazenda',
      city: 'Cidade',
      state: 'UF',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      producerId: 'uuid-produtor',
    };
    (prisma.property.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...dto,
    });
    const result = await service.run(dto);
    expect(result).toMatchObject(dto);
    // Solução alternativa: verificar as chamadas do mock diretamente
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(jest.isMockFunction(prisma.property.create)).toBe(true);
    expect((prisma.property.create as jest.Mock).mock.calls[0][0]).toEqual({
      data: dto,
    });
  });

  it('deve lançar erro se soma das áreas exceder total', async () => {
    const dto: PropertyCreateDto = {
      name: 'Fazenda',
      city: 'Cidade',
      state: 'UF',
      totalArea: 50,
      arableArea: 30,
      vegetationArea: 30,
      producerId: 'uuid-produtor',
    };
    await expect(service.run(dto)).rejects.toThrow(BadRequestException);
  });
});
