import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/providers/database/PrismaService';
import { PropertyUpdateDto } from './dto/property-update.dto';
import { PropertyUpdateService } from './property-update.service';

const prismaMock = {
  property: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('PropertyUpdateService', () => {
  let service: PropertyUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyUpdateService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PropertyUpdateService>(PropertyUpdateService);
  });

  it('deve atualizar se propriedade existir e áreas válidas', async () => {
    prismaMock.property.findUnique.mockResolvedValue({
      id: '1',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
    });

    prismaMock.property.update.mockResolvedValue({});
    const dto: PropertyUpdateDto = { arableArea: 50 };
    await service.run('1', dto);
    const propertyUpdateMock = prismaMock.property.update;
    propertyUpdateMock.mock.calls.find((call) => {
      expect(call[0]).toEqual({
        where: { id: '1' },
        data: dto,
      });
    });
  });

  it('deve lançar NotFoundException se não existir', async () => {
    prismaMock.property.findUnique.mockResolvedValue(null);
    await expect(service.run('1', {})).rejects.toThrow(NotFoundException);
  });

  it('deve lançar BadRequestException se soma das áreas exceder total', async () => {
    prismaMock.property.findUnique.mockResolvedValue({
      id: '1',
      totalArea: 50,
      arableArea: 30,
      vegetationArea: 20,
    });
    const dto: PropertyUpdateDto = { arableArea: 40, vegetationArea: 20 };
    await expect(service.run('1', dto)).rejects.toThrow(BadRequestException);
  });
});
