<template>
  <v-container>
    Skills
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({
  components: {},
})
export default class SkillsPage extends Page {
  get title() {
    return this.$tc('p.skill', 2);
  }
}
</script>
