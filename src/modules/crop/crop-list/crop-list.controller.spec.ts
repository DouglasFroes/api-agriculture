import { Test, TestingModule } from '@nestjs/testing';
import { CropListController } from './crop-list.controller';
import { CropListService } from './crop-list.service';
import { CropListDto } from './dto/crop-list.dto';

const serviceMock = {
  run: jest.fn(),
};

describe('CropListController', () => {
  let controller: CropListController;
  let service: CropListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropListController],
      providers: [{ provide: CropListService, useValue: serviceMock }],
    }).compile();
    controller = module.get<CropListController>(CropListController);
    service = module.get<CropListService>(CropListService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service com o DTO correto', async () => {
    const dto: CropListDto = { page: 1, limit: 10 };
    (service.run as jest.Mock).mockResolvedValue({
      data: [],
      meta: { total: 0 },
    });
    const result = await controller.list(dto);
    expect(service.run).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('data');
  });
});
