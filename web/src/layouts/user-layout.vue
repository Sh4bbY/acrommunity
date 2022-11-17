<template>
  <v-app :style="style">
    <feedback-dialog v-model="$store.state.app.dialog.feedback"/>
    <loading-indicator/>
    <user-header/>
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
import FeedbackDialog from '~/components/feedback-dialog.vue';
import BottomNavigation from '~/components/layout/bottom-navigation.vue';
import UserHeader from '~/components/layout/user-header.vue';
import SideNavigation from '~/components/layout/side-navigation.vue';
import LoadingIndicator from '~/components/loading-indicator.vue';

@Component({
  components: {UserHeader, SideNavigation, LoadingIndicator, BottomNavigation, FeedbackDialog},
})
export default class UserLayout extends Vue {
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
