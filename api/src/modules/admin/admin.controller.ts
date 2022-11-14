import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AdminService} from './admin.service';

@Controller('/api/admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {
  }

  @Get('backup/data')
  async backupPoses() {
    await this.adminService.backupData();
  }

  @Get('export/data')
  async exportPoses() {
    return await this.adminService.exportData();
  }
}
