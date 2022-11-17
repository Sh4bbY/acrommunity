<template>
  <v-app-bar app clipped-left dark color="primary" short :hide-on-scroll="$vuetify.breakpoint.xs">
    <v-app-bar-nav-icon @click="onNavIconClick" class="mr-3"/>
    <router-link :to="{name: 'home'}" class="d-inline-flex">
      <v-img src="/img/logo.png" max-height="40" max-width="40" contain/>
      <v-app-bar-title class="navigation-title pt-3">crommunity</v-app-bar-title>
    </router-link>

    <v-spacer/>
    <v-btn color="secondary" rounded @click="$store.dispatch('app/showFeedbackDialog')" min-width="36px" :class="{'px-0': $vuetify.breakpoint.xs}">
      <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-chat-alert</v-icon>
      <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('label.feedback') }}</span>
    </v-btn>
    <v-spacer/>
    <user-menu v-if="$store.state.auth.isSignedIn"/>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import UserMenu from '~/components/layout/user-menu.vue';

@Component({
  components: {UserMenu},
})
export default class AdminHeader extends Vue {
  showFeedbackDialog = false;
  screenshot = null;

  onNavIconClick() {
    this.$store.dispatch('app/toggleNavigation');
  }
}
</script>

<style lang="scss" scoped>
.navigation-title {
  color: #24396d;
  font-weight: bold;
  font-size: 24px;
}
</style>
