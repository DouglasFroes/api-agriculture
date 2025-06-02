import { Test, TestingModule } from '@nestjs/testing';
import { CropCreateController } from './crop-create.controller';
import { CropCreateService } from './crop-create.service';
import { CropCreateDto } from './dto/crop-create.dto';

const serviceMock = {
  run: jest.fn(),
};

describe('CropCreateController', () => {
  let controller: CropCreateController;
  let service: CropCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropCreateController],
      providers: [{ provide: CropCreateService, useValue: serviceMock }],
    }).compile();
    controller = module.get<CropCreateController>(CropCreateController);
    service = module.get<CropCreateService>(CropCreateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service com o DTO correto', async () => {
    const dto: CropCreateDto = {
      name: 'Soja',
      year: 2025,
      propertyId: 'property-uuid',
    };
    (service.run as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    const result = await controller.create(dto);
    expect(service.run).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});
