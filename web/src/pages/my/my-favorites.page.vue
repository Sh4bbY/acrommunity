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
export default class MyFavoritesPage extends Page {
  get title() {
    return this.$tc('p.my', 2) + ' ' + this.$tc('p.favorite', 2);
  }

  get type() {
    return MarkType.Favorite;
  }
}
</script>
