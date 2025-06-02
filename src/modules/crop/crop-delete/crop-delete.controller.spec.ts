import { Test, TestingModule } from '@nestjs/testing';
import { CropDeleteController } from './crop-delete.controller';
import { CropDeleteService } from './crop-delete.service';

const serviceMock = {
  run: jest.fn(),
};

describe('CropDeleteController', () => {
  let controller: CropDeleteController;
  let service: CropDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropDeleteController],
      providers: [{ provide: CropDeleteService, useValue: serviceMock }],
    }).compile();
    controller = module.get<CropDeleteController>(CropDeleteController);
    service = module.get<CropDeleteService>(CropDeleteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o service com o id correto', async () => {
    (service.run as jest.Mock).mockResolvedValue({ id: '1', name: 'Soja' });
    const result = await controller.delete('1');
    expect(service.run).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1', name: 'Soja' });
  });
});
