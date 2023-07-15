import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMonitoredNumberDto } from './create-user-monitored-number.dto';

export class UpdateUserMonitoredNumberDto extends PartialType(
  CreateUserMonitoredNumberDto,
) {}
