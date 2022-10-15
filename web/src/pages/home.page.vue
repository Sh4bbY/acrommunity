<template>
  <v-container>
    Home
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class HomePage extends Page {
  get title() {
    return 'HomePage';
  }
}
</script>
