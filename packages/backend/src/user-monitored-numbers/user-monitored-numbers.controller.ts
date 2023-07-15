import { AddMonitoredNumbersWithUserSchema } from '@lottolotto/util';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { z } from 'zod';
import { UserMonitoredNumbersService } from './user-monitored-numbers.service';

@Controller('user-monitored-numbers')
export class UserMonitoredNumbersController {
  constructor(
    private readonly userMonitoredNumbersService: UserMonitoredNumbersService,
  ) {}

  @Post()
  async create(
    @Body() payload: z.infer<typeof AddMonitoredNumbersWithUserSchema>,
  ) {
    const data = await this.userMonitoredNumbersService.create(payload);
    return { success: data, error: null };
  }

  @Post()
  findAll() {
    return this.userMonitoredNumbersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMonitoredNumbersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMonitoredNumbersService.remove(+id);
  }
}
