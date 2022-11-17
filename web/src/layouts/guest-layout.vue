<template>
  <v-app :style="style">
    <login-dialog v-model="$store.state.app.dialog.login"/>
    <register-dialog v-model="$store.state.app.dialog.register"/>
    <loading-indicator/>
    <guest-header/>
    <side-navigation/>

    <v-main ref="main">
      <transition name="page" mode="out-in">
        <slot/>
      </transition>
    </v-main>

    <bottom-navigation v-if="$vuetify.breakpoint.xs" :height="bottomNavHeight"/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import LoginDialog from '~/components/dialogs/login-dialog.vue';
import RegisterDialog from '~/components/dialogs/register-dialog.vue';
import BottomNavigation from '~/components/layout/bottom-navigation.vue';
import GuestHeader from '~/components/layout/guest-header.vue';
import SideNavigation from '~/components/layout/side-navigation.vue';
import LoadingIndicator from '~/components/loading-indicator.vue';

@Component({
  components: {RegisterDialog, BottomNavigation, GuestHeader, LoadingIndicator, LoginDialog, SideNavigation},
})
export default class GuestLayout extends Vue {
  dialog = {
    login: false,
  };
  bottomNavHeight = 56;

  get style() {
    return {paddingBottom: this.$vuetify.breakpoint.xs ? this.bottomNavHeight + 'px' : 0};
  }
}
</script>


<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s, transform 0.2s;
}

.page-enter {
  opacity: 0;
  transform: translateY(-10%);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
</style>
