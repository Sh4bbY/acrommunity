<template>
  <v-container>
    <home-overview/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import HomeOverview from '~/components/home/home-overview.vue';
import Page from '../page.vue';

@Component({
  components: {HomeOverview},
})
export default class MyMarksPage extends Page {
  get title() {
    return this.$t('label.myMarks');
  }
}
</script>
