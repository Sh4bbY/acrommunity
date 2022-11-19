<template>
  <v-app>
    <feedback-dialog v-model="$store.state.app.dialog.feedback"/>
    <loading-indicator/>
    <app-header/>
    <side-navigation/>

    <v-main ref="main">
      <div :style="pageWrapStyle">
        <transition name="page" mode="out-in">
          <slot/>
        </transition>
      </div>
      <app-footer/>
    </v-main>

    <bottom-navigation v-if="$vuetify.breakpoint.xs"/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FeedbackDialog from '~/components/dialogs/feedback-dialog.vue';
import AppFooter from '~/components/layout/app-footer.vue';
import AppHeader from '~/components/layout/app-header.vue';
import BottomNavigation from '~/components/layout/bottom-navigation.vue';
import SideNavigation from '~/components/layout/side-navigation.vue';
import LoadingIndicator from '~/components/common/loading-indicator.vue';

@Component({
  components: {AppFooter, LoadingIndicator, AppHeader, SideNavigation, BottomNavigation, FeedbackDialog},
})
export default class UserLayout extends Vue {
  get pageWrapStyle() {
    return {
      minHeight: 'calc(100% - 36px)',
    };
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
