<template>
  <v-app>
    <feedback-dialog v-model="dialog.feedback"/>
    <loading-indicator/>
    <admin-header @feedback="dialog.feedback = true"/>
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
import FeedbackDialog from '~/components/feedback-dialog.vue';
import AdminHeader from '~/components/layout/admin-header.vue';
import AdminNavigation from '~/components/layout/admin-navigation.vue';
import LoadingIndicator from '~/components/loading-indicator.vue';

@Component({
  components: {AdminNavigation, AdminHeader, LoadingIndicator, FeedbackDialog},
})
export default class AdminLayout extends Vue {
  dialog = {
    feedback: false,
  };
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
