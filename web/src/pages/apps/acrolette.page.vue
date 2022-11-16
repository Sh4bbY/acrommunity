<template>
  <v-container>
    <acrolette/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Acrolette from '~/components/acrolette/acrolette.vue';
import Page from '../page.vue';

@Component({
  components: {Acrolette},
})
export default class AcrolettePage extends Page {
  get title() {
    return this.$t('label.acrolette');
  }
}
</script>
