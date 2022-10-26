import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AcroQuizService} from './acro-quiz.service';


@Controller('/api/acro-quiz')
@UseGuards(AuthGuard('jwt'))
export class AcroQuizController {
  constructor(private readonly acroQuizService: AcroQuizService) {
  }

  @Get('question/name-of-pose')
  async getQuestion() {
    return await this.acroQuizService.getQuestion();
  }

  @Get('question/look-of-pose')
  async getImageForPoseQuestion() {
    return await this.acroQuizService.getLookOfPoseQuestion();
  }

  @Post('solution/name-of-pose')
  async postSolution(@Body() solution: any) {
    return await this.acroQuizService.postSolution(solution);
  }
}
