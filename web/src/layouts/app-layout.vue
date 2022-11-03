<template>
  <v-app :style="style">
    <acro-loading-indicator/>
    <app-header/>
    <app-navigation/>

    <v-main ref="main">
      <transition name="page" mode="out-in">
        <slot/>
      </transition>
    </v-main>

    <app-bottom-navigation v-if="$vuetify.breakpoint.xs" :height="bottomNavHeight"/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AcroLoadingIndicator from '~/components/acro-loading-indicator.vue';
import AppBottomNavigation from '~/components/layout/app-bottom-navigation.vue';
import AppHeader from '~/components/layout/app-header.vue';
import AppNavigation from '~/components/layout/app-navigation.vue';

@Component({
  components: {AppHeader, AppNavigation, AcroLoadingIndicator, AppBottomNavigation},
})
export default class AppLayout extends Vue {
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
