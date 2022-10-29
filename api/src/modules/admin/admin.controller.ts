import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AdminService} from './admin.service';

@Controller('/api/admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {
  }

  @Get('export/pose/lbase')
  async exportLbasePoses() {
    const data = await this.adminService.exportLbasePoses();
    return data;
  }
}
