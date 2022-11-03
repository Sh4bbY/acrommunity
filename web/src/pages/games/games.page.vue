<template>
  <v-container>
    <ul>
      <li>
        <router-link :to="{name: 'acrolette'}">{{ $t('label.acrolette') }}</router-link>
      </li>
      <li>
        <router-link :to="{name: 'acro-quiz'}">{{ $t('label.acroQuiz') }}</router-link>
      </li>
    </ul>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({})
export default class GamesPage extends Page {
  get title() {
    return this.$tc('p.game', 2);
  }
}
</script>
