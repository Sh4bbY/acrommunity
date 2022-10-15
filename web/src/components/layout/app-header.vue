<template>
  <v-app-bar app clipped-left dark color="primary" short>
    <v-app-bar-nav-icon @click="onNavIconClick"/>
    <v-img src="/img/logo.png" max-height="40" max-width="100" contain/>
    <v-app-bar-title>Acrommunity</v-app-bar-title>
    <v-spacer/>
    <user-menu v-if="$store.state.auth.isAuthenticated"/>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import UserMenu from '~/components/layout/user-menu.vue';

@Component({
  components: {UserMenu},
})
export default class AppHeader extends Vue {
  showFeedbackDialog = false;
  screenshot = null;

  onNavIconClick() {
    this.$store.dispatch('app/toggleNavigation');
  }
}
</script>
