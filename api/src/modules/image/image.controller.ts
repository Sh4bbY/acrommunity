import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import Joi from 'joi';
import {Validator} from '~/utils';
import {ImageService} from './image.service';

@Controller('/api/images')
@UseGuards(AuthGuard('jwt'))
export class ImageController {
  constructor(private readonly imageService: ImageService) {
  }

  @Get()
  async getPaginatedData(@Query() query) {
    const queryParams = Validator.validatePaginatedQuery(query);
    return await this.imageService.getPaginatedData(queryParams);
  }

  @Get(':id')
  async getOne(@Param() params: any) {
    Validator.validate(Joi.object({
      id: Joi.number(),
    }), params);

    return await this.imageService.getImage(Number(params.id));
  }
}
