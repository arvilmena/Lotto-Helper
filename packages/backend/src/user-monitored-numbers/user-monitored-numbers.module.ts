import { Module } from '@nestjs/common';
import { UserMonitoredNumbersRepository } from './repositories/user-monitored-numbers.repository';
import { UserMonitoredNumbersController } from './user-monitored-numbers.controller';
import { UserMonitoredNumbersService } from './user-monitored-numbers.service';

@Module({
  controllers: [UserMonitoredNumbersController],
  providers: [UserMonitoredNumbersService, UserMonitoredNumbersRepository],
})
export class UserMonitoredNumbersModule {}
