import { Test, TestingModule } from '@nestjs/testing';
import { UserMonitoredNumbersService } from './user-monitored-numbers.service';

describe('UserMonitoredNumbersService', () => {
  let service: UserMonitoredNumbersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMonitoredNumbersService],
    }).compile();

    service = module.get<UserMonitoredNumbersService>(
      UserMonitoredNumbersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
