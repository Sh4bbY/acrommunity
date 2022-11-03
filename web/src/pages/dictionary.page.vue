<template>
  <v-container>
    <ul>
      <li v-for="(link, idx) in links" :key="idx">
        <router-link :to="{name: link.name}">{{ link.text }}</router-link>
      </li>
    </ul>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component({})
export default class DictionaryPage extends Page {
  get title() {
    return this.$t('label.dictionary');
  }

  get links() {
    return [
      {name: 'poses', text: this.$tc('p.pose', 2)},
      {name: 'flows', text: this.$tc('p.flow', 2)},
      {name: 'skills', text: this.$tc('p.skill', 2)},
      {name: 'images', text: this.$tc('p.image', 2)},
      {name: 'videos', text: this.$tc('p.video', 2)},
    ];
  }
}
</script>
