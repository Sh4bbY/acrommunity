import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {MyService} from './my.service';

@Controller('/api/my')
@UseGuards(AuthGuard('jwt'))
export class MyController {
  constructor(private readonly myService: MyService) {
  }

  @Get('lists')
  async getOne(@Req() req: Request) {
    return await this.myService.getLists(req.user.id);
  }

  @Delete('/list/:listId/:listableType/:listableId')
  async deleteListableFromList(@Req() req: Request, @Param() params) {
    return await this.myService.deleteListableFromList(req.user.id, params.listId, params.listableType, params.listableId);
  }

  @Delete('/list/:listId')
  async deleteList(@Req() req: Request, @Param() params) {
    return await this.myService.deleteList(req.user.id, params.listId);
  }

  @Put('/list/:listId/add')
  async addItemsToList(@Req() req: Request, @Param('listId') listId, @Body() body: { listableType: string, listableIds: number }) {
    return await this.myService.addItemsToList(req.user.id, Number(listId), body);
  }

  @Put('/list/:listId')
  async updateList(@Req() req: Request, @Param('listId') listId, @Body() body: any) {
    return await this.myService.updateList(req.user.id, listId, body);
  }

  @Post('/list')
  async createList(@Req() req: Request, @Body() body: any) {
    return await this.myService.createList(req.user.id, body);
  }
}
