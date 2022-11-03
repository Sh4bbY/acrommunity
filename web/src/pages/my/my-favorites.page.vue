<template>
  <v-container>
    <my-favorites/>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import MyFavorites from '~/components/my/my-favorites.vue';
import Page from '../page.vue';

@Component({
  components: {MyFavorites},
})
export default class MyFavoritesPage extends Page {
  get title() {
    return this.$tc('p.my', 2) + ' ' + this.$tc('p.favorite', 2);
  }
}
</script>
