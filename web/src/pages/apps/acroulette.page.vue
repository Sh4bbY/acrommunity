<template>
  <v-container>
    <acroulette/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Acroulette from '~/components/acroulette/acroulette.vue';
import Page from '../page.vue';

@Component({
  components: {Acroulette},
})
export default class AcroulettePage extends Page {
  get title() {
    return this.$t('label.acroulette');
  }
}
</script>
