import { Test, TestingModule } from '@nestjs/testing';
import { CropFindController } from './crop-find.controller';
import { CropFindService } from './crop-find.service';

const serviceMock = {
  run: jest.fn(),
};

describe('CropFindController', () => {
  let controller: CropFindController;
  let service: CropFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropFindController],
      providers: [{ provide: CropFindService, useValue: serviceMock }],
    }).compile();
    controller = module.get<CropFindController>(CropFindController);
    service = module.get<CropFindService>(CropFindService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service com o id correto', async () => {
    (service.run as jest.Mock).mockResolvedValue({ id: '1', name: 'Soja' });
    const result = await controller.find('1');
    expect(service.run).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1', name: 'Soja' });
  });
});
