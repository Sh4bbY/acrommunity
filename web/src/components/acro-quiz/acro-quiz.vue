<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ $t('label.acroQuiz') }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="sound.muted = !sound.muted">
          <v-icon>{{ sound.muted ? 'mdi-volume-off' : 'mdi-volume-high' }}</v-icon>
        </v-btn>
        <v-spacer/>
        <span>{{ $tc('p.question', 2) }}: <span style="color: lightgreen">{{ count.correct }}</span> / {{ count.questions }}</span>
      </v-toolbar>

      <v-expand-transition>
        <div class="progress" v-show="timerProgress">
          <div class="progress-bar" :style="progressBarStyle"/>
        </div>
      </v-expand-transition>

      <v-card-text v-if="question">
        <div class="d-flex flex-column align-center">
          <h2 class="mb-3">{{ questionText }}</h2>
          <v-img v-if="question.type === QuestionType.NameOfPose" :src="question.img" class="mb-5" max-width="600" width="100%" max-height="400" contain/>
        </div>
        <v-row v-if="question.type === QuestionType.NameOfPose">
          <v-col v-for="answer in question.answers" :key="answer.text" cols="12" sm="6" lg="3" class="py-1">
            <v-btn width="100%" class="answer" :class="answerClass(answer.text)" @click="onAnswerClick(answer)">{{ answer.text }}</v-btn>
          </v-col>
        </v-row>
        <v-row v-else-if="question.type === QuestionType.LookOfPose">
          <v-col v-for="answer in question.answers" :key="answer.img" cols="12" sm="6" lg="3">
            <v-sheet outlined class="p1-2 cursor-pointer answer" :class="answerClass(answer.img)" @click="onAnswerClick(answer)">
              <v-img :src="answer.img" contain max-width="100%" max-height="200px"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {QuestionType} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AcroQuiz extends Vue {
  question = null;
  solution = null;
  selection = null;
  nextQuestionCount = null;
  nextQuestionMaxCount = 100;
  responsePending = false;
  sound = {
    correct: null,
    incorrect: null,
    muted: false,
  };
  count = {
    questions: 0,
    correct: 0,
  };


  async mounted() {
    await this.fetchQuestion();

    this.sound.correct = new Audio('/sounds/quiz/correct.mp3');
    this.sound.incorrect = new Audio('/sounds/quiz/incorrect.mp3');
  }

  async nextQuestion() {
    this.selection = null;
    this.solution = null;
    await this.fetchQuestion();
  }

  async fetchQuestion() {
    try {
      const response = await this.$api.get('/api/acro-quiz/question');
      this.question = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async onAnswerClick(answer) {
    if (this.solution || this.responsePending) {
      return;
    }
    await this.submitAnswer(answer);
  }

  async submitAnswer(answer) {
    try {
      this.selection = this.question.type === QuestionType.NameOfPose ? answer.text : answer.img;
      this.responsePending = true;
      const response = await this.$api.post('/api/acro-quiz/answer', {
        type: this.question.type,
        answer: {id: this.question.pose.id, selection: this.selection},
      });

      this.count.questions++;
      if (response.data.isCorrect) {
        this.count.correct++;
      }
      this.playSound(response.data.isCorrect);
      this.solution = response.data.solution;
      this.nextQuestionCount = this.nextQuestionMaxCount;
      window.requestAnimationFrame(this.animationFrameHandler.bind(this));
    } catch (e) {
      this.$notify.error(e);
    }
    this.responsePending = false;
  }

  playSound(isCorrect: boolean) {
    if (this.sound.muted) {
      return;
    }

    if (isCorrect) {
      this.sound.correct.play();
    } else {
      this.sound.incorrect.play();
    }
  }

  animationFrameHandler() {
    this.nextQuestionCount--;
    if (this.nextQuestionCount <= 0) {
      this.nextQuestion();
    } else {
      window.requestAnimationFrame(this.animationFrameHandler.bind(this));
    }
  }

  getAnswerColor(answerText: string) {
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

  getAnswerStyle(answer: any) {
    if (this.solution === answer.img) {
      return {borderColor: 'green', borderWidth: '1px'};
    }
    if (!this.solution && this.selection === answer.img) {
      return {borderColor: this.$vuetify.theme.currentTheme.primary, borderWidth: '1px'};
    }
    if (this.selection === answer.img && this.solution !== this.selection) {
      return {borderColor: 'red', borderWidth: '1px'};
    }
    return {};
  }

  answerClass(key: string) {
    if (!this.solution && this.selection === key) {
      return 'selected';
    }
    if (this.solution === key) {
      return 'correct';
    }
    if (this.selection === key && this.solution !== this.selection) {
      return 'incorrect';
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

  get questionText() {
    switch (this.question.type) {
      case QuestionType.LookOfPose:
        return this.$t('quiz.lookOfPose', {pose: this.question.pose.name});
      case QuestionType.NameOfPose:
        return this.$t('quiz.nameOfPose');
    }
    return undefined;
  }

  get QuestionType() {
    return QuestionType;
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/colors";

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

.answer {
  &.v-sheet {
    border-radius: 2px;

    &.correct {
      border-color: rgba(green, 0.6);
      border-width: 2px;
    }

    &.incorrect {
      border-color: rgba(red, 0.6);
      border-width: 2px;
    }

    &.selected {
      border-color: rgba($c-primary, 0.6);
      border-width: 2px;
    }
  }

  &.v-btn {
    height: auto !important;
    padding: 6px 16px !important;
    min-height: 36px;

    ::v-deep span.v-btn__content {
      white-space: break-spaces;
      width: 100%;
    }
  }
}
</style>
