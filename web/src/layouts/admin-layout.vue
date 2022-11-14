<template>
  <v-app :style="style">
    <loading-indicator/>
    <admin-header/>
    <admin-navigation/>

    <v-main ref="main">
      <transition name="page" mode="out-in">
        <slot/>
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AdminHeader from '~/components/layout/admin-header.vue';
import AdminNavigation from '~/components/layout/admin-navigation.vue';
import LoadingIndicator from '~/components/loading-indicator.vue';

@Component({
  components: {AdminNavigation, AdminHeader, LoadingIndicator},
})
export default class AdminLayout extends Vue {
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
