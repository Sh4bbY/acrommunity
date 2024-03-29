import {Role} from '@acrommunity/common';
import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Validator} from '~/utils';
import {Roles} from '~/utils/nest/roles.decorator';
import {RolesGuard} from '~/utils/nest/roles.guard';
import {CommentService} from './comment.service';

@Controller('/api/comments')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
@UseGuards(AuthGuard('jwt'))
export class CommentControllerAdmin {
  constructor(private readonly commentService: CommentService) {
  }

  @Get(':id')
  async getComment(@Param('id') id: string) {
    return await this.commentService.getComment(+id);
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.commentService.getPaginatedData(queryParams);
  }
}
