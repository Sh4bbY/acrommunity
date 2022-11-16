<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ $t('label.acroQuiz') }}</v-toolbar-title>
        <v-spacer/>
        <span>Score: {{ score }}</span>
      </v-toolbar>
      <v-expand-transition>
        <div class="progress" v-show="timerProgress">
          <div class="progress-bar" :style="progressBarStyle">
          </div>
        </div>
      </v-expand-transition>
      <v-card-text v-if="question">
        <div class="d-flex flex-column align-center">
          <h2 class="mb-3">{{ question.text }}</h2>
          <v-img v-if="type === 'name-of-pose'" :src="question.img" class="mb-5" max-width="600" width="100%" max-height="400" contain/>
        </div>
        <v-row v-if="type === 'name-of-pose'">
          <v-col v-for="answer in question.answers" :key="answer.text" cols="12" sm="6" lg="3" class="py-1">
            <v-btn width="100%" :color="getColor(answer.text)" @click="onAnswerClick(answer)" class="answer-btn">{{ answer.text }}</v-btn>
          </v-col>
        </v-row>
        <v-row v-else-if="type === 'look-of-pose'">
          <v-col v-for="answer in question.answers" :key="answer.text" cols="12" sm="6" lg="3">
            <v-sheet class="cursor-pointer" outlined rounded @click="onAnswerClick(answer)" :color="getColor(answer.text)">
              <v-img :src="answer.img" contain max-width="100%" max-height="200px"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Randomizer} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

enum QuizQuestionType {
  NameOfPose = 'name-of-pose',
  LookOfPose = 'look-of-pose',
}

@Component({
  components: {},
})
export default class AcroQuiz extends Vue {
  question = null;
  score = 0;
  solution = null;
  selection = null;
  nextQuestionCount = null;
  nextQuestionMaxCount = 100;
  responsePending = false;
  type = QuizQuestionType.NameOfPose;
  types = Object.values(QuizQuestionType);

  async mounted() {
    await this.fetchQuestion();
  }

  async nextQuestion() {
    this.selection = null;
    this.solution = null;
    this.type = Randomizer.getRandomArrayValue(this.types);
    await this.fetchQuestion();
  }


  async fetchQuestion() {
    if (this.type === QuizQuestionType.NameOfPose) {
      const response = await this.$api.get('/api/acro-quiz/question/name-of-pose');
      this.question = response.data;
    } else if (this.type === QuizQuestionType.LookOfPose) {
      const response = await this.$api.get('/api/acro-quiz/question/look-of-pose');
      this.question = response.data;
    }
  }

  async onAnswerClick(answer) {
    if (this.solution || this.responsePending) {
      return;
    }
    await this.submitSolution(answer);
  }

  async submitSolution(answer) {
    try {
      this.selection = answer.text;
      this.responsePending = true;
      const response = await this.$api.post('/api/acro-quiz/solution/name-of-pose', {
        poseId: this.question.poseId,
        solution: answer.text,
      });
      this.score = response.data.isCorrect ? this.score + 1 : this.score - 1;
      this.solution = response.data.solution;
      this.nextQuestionCount = this.nextQuestionMaxCount;
      window.requestAnimationFrame(this.animationFrameHandler.bind(this));
    } catch (e) {
      this.$notify.error(e);
    }
    this.responsePending = false;
  }

  animationFrameHandler() {
    this.nextQuestionCount--;
    if (this.nextQuestionCount <= 0) {
      this.nextQuestion();
    } else {
      window.requestAnimationFrame(this.animationFrameHandler.bind(this));
    }
  }

  getColor(answerText: string) {
    if (this.solution === answerText) {
      return 'success';
    }
    if (!this.solution && this.selection === answerText) {
      return 'primary';
    }
    if (this.selection === answerText && this.solution !== this.selection) {
      return 'error';
    }
    return '';
  }

  get timerProgress() {
    return this.nextQuestionCount / this.nextQuestionMaxCount * 100;
  }

  get progressBarStyle() {
    return {
      width: this.timerProgress + '%',
    };
  }
}
</script>

<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 15px;
  background-color: rgba(orange, 0.2);
}

.progress-bar {
  width: 100%;
  height: 100%;
  background-color: rgba(orange, 0.5);
}

.answer-btn {
  height: auto !important;
  padding: 6px 16px !important;
  min-height: 36px;

  ::v-deep span.v-btn__content {
    white-space: break-spaces;
    width: 100%;
  }
}
</style>
