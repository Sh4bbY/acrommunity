<template>
  <v-container>
    <acro-quiz/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import AcroQuiz from '~/components/acro-quiz/acro-quiz.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import Page from '../page.vue';

@Component({
  components: {TooltipButton, AcroQuiz},
})
export default class AcroQuizPage extends Page {

}
</script>
