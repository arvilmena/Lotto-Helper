import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserMonitoredNumbersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public create = this.prisma.userMonitoredNumbers.create;
  public findFirst = this.prisma.userMonitoredNumbers.findFirst;
  public findMany = this.prisma.userMonitoredNumbers.findMany;
  public update = this.prisma.userMonitoredNumbers.update;
  public delete = this.prisma.userMonitoredNumbers.delete;
  public count = this.prisma.userMonitoredNumbers.count;
}
