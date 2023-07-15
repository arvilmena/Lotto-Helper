import { Test, TestingModule } from '@nestjs/testing';
import { UserMonitoredNumbersController } from './user-monitored-numbers.controller';
import { UserMonitoredNumbersService } from './user-monitored-numbers.service';

describe('UserMonitoredNumbersController', () => {
  let controller: UserMonitoredNumbersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMonitoredNumbersController],
      providers: [UserMonitoredNumbersService],
    }).compile();

    controller = module.get<UserMonitoredNumbersController>(
      UserMonitoredNumbersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
