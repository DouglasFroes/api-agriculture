import { Test, TestingModule } from '@nestjs/testing';
import { CropUpdateController } from './crop-update.controller';
import { CropUpdateService } from './crop-update.service';
import { CropUpdateDto } from './dto/crop-update.dto';

const serviceMock = {
  run: jest.fn(),
};

describe('CropUpdateController', () => {
  let controller: CropUpdateController;
  let service: CropUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropUpdateController],
      providers: [{ provide: CropUpdateService, useValue: serviceMock }],
    }).compile();
    controller = module.get<CropUpdateController>(CropUpdateController);
    service = module.get<CropUpdateService>(CropUpdateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service com id e DTO corretos', async () => {
    const dto: CropUpdateDto = { name: 'Soja', year: 2025 };
    (service.run as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    const result = await controller.update('1', dto);
    expect(service.run).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});
