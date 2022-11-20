import {Role} from '@acrommunity/common';
import {Body, Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {AdminService} from './admin.service';

@Controller('/api/admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {
  }

  @Put('user/:id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    Validator.validate(Joi.object({
      role: Joi.string().valid(...Object.values(Role)),
    }), body);

    await this.adminService.updateUser(+id, body);
  }

  @Get('backup/data')
  async backupPoses() {
    await this.adminService.backupData();
  }

  @Get('export/data')
  async exportPoses() {
    return await this.adminService.exportData();
  }

  @Get('dev')
  async doDevStuff() {
    // return await this.adminService.getTransitions();
  }
}
