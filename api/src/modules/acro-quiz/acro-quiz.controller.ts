import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AcroQuizService} from './acro-quiz.service';


@Controller('/api/acro-quiz')
@UseGuards(AuthGuard('jwt'))
export class AcroQuizController {
  constructor(private readonly acroQuizService: AcroQuizService) {
  }

  @Get('question')
  async getQuestion() {
    return await this.acroQuizService.getQuestion();
  }

  @Post('solution')
  async postSolution(@Body() solution: any) {
    return await this.acroQuizService.postSolution(solution);
  }
}
