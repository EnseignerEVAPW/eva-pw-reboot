/* eslint-disable prettier/prettier */
// codeforces.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CodeforcesService } from './codeforces.service';

@Controller('codeforces')
export class CodeforcesController {
  constructor(private readonly codeforcesService: CodeforcesService) {}

  @Get('user/:username')
  async getUserInfo(@Param('username') username: string) {
    return this.codeforcesService.getUserInfo(username);
  }

  @Get('info/:username')
  async getInfoProfile(@Param('username') username: string) {
    return this.codeforcesService.getInfoForProfile(username);
  }

  @Get('values/:username')
  async getValuesHeatMap(@Param('username') username: string) {
    return this.codeforcesService.getValuesHeatMap(username);
  }
}
