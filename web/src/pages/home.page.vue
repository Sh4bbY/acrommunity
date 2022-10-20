<template>
  <v-container>
    <my-lists/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import MyLists from '~/components/my-lists/my-lists.vue';
import Page from './page.vue';

@Component({
  components: {MyLists},
})
export default class HomePage extends Page {
  get title() {
    return 'HomePage';
  }
}
</script>
