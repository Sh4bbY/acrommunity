import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Validator} from '~/utils';
import {UserService} from './user.service';

@Controller('/api/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.userService.getPaginatedData(queryParams);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    Validator.validateId(id);
    const user = await this.userService.getUser(Number(id));
    user.setDataValue('password', undefined);
    return user;
  }
}
