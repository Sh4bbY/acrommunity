<template>
  <v-app-bar app clipped-left dark color="primary" short>
    <v-app-bar-nav-icon @click="onNavIconClick"/>
    <v-img src="/img/logo.svg" max-height="40" max-width="100" contain/>
    <v-app-bar-title v-if="$vuetify.breakpoint.smAndUp">{{ $store.state.app.title }}</v-app-bar-title>
    <v-spacer/>
    <v-btn color="secondary" rounded @click="$emit('feedback')">
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
