<template>
  <v-container>
    <my-marks :type="type" :title="title"/>
  </v-container>
</template>

<script lang="ts">
import {MarkType} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import MyMarks from '~/components/my/my-marks.vue';
import Page from '../page.vue';

@Component({
  components: {MyMarks},
})
export default class MyTrainingPage extends Page {
  get title() {
    return this.$tc('p.my') + ' ' + this.$tc('p.trainingPlan');
  }

  get type() {
    return MarkType.WorkingOn;
  }
}
</script>
