import { Test, TestingModule } from '@nestjs/testing';
import { ProducerCreate2Controller } from './producer-create2.controller';
import { ProducerCreate2Service } from './producer-create2.service';

describe('ProducerCreate2Controller', () => {
  let controller: ProducerCreate2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerCreate2Controller],
      providers: [ProducerCreate2Service],
    }).compile();

    controller = module.get<ProducerCreate2Controller>(
      ProducerCreate2Controller,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
