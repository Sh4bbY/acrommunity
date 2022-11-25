<template>
  <v-bottom-navigation app grow fixed>
    <v-btn v-for="item in items" :key="item.title" :to="item.route">
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class AppBottomNavigation extends Vue {
  get items() {
    return [
      // {title: this.$t('label.home'), icon: 'mdi-home', route: {name: 'home'}, exact: true},
      {title: this.$t('label.dictionary'), icon: 'mdi-book-open-variant', route: {name: 'dictionary'}},
      {title: this.$tc('p.app', 2), icon: 'mdi-gamepad-variant', route: {name: 'apps'}},
      {title: this.$tc('p.jam', 2), icon: 'mdi-calendar', route: {name: 'jams'}},
    ];
  }
}
</script>

<style lang="scss" scoped>

</style>
