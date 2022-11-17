import {QuestionType, Randomizer} from '@acrommunity/common';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {AcroQuizService} from './acro-quiz.service';

@Controller('/api/acro-quiz')
export class AcroQuizController {
  constructor(private readonly acroQuizService: AcroQuizService) {
  }

  @Get('question')
  async getQuestion() {
    const questionTypeFunctions = [
      () => this.acroQuizService.getNameOfPoseQuestion(),
      () => this.acroQuizService.getLookOfPoseQuestion(),
    ];
    return await Randomizer.getRandomArrayValue(questionTypeFunctions)();
  }

  @Post('answer')
  async submitAnswer(@Body() answer: AnswerDTO) {
    return await this.acroQuizService.checkAnswer(answer);
  }
}

export interface AnswerDTO {
  type: QuestionType,
  answer: {
    id: number,
    selection: string,
  },
}
