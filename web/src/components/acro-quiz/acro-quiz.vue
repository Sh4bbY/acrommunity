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
          <h1 class="mb-5">{{ question.text }}</h1>
          <v-img :src="question.img" class="mb-5" max-width="600" width="100%" max-height="400" contain/>
        </div>
        <v-row>
          <v-col v-for="answer in question.answers" :key="answer.text" cols="12" sm="6" lg="3">
            <v-btn width="100%" :color="getColor(answer.text)" @click="onAnswerClick(answer)">{{ answer.text }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AcroQuiz extends Vue {
  question = null;
  score = 0;
  solution = null;
  selection = null;
  nextQuestionCount = null;
  nextQuestionMaxCount = 150;
  responsePending = false;

  async mounted() {
    await this.fetchQuestion();
  }

  async nextQuestion() {
    this.selection = null;
    this.solution = null;
    await this.fetchQuestion();
  }


  async fetchQuestion() {
    const response = await this.$api.get('/api/acro-quiz/question');
    this.question = response.data;
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
      const response = await this.$api.post('/api/acro-quiz/solution', {
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
</style>
