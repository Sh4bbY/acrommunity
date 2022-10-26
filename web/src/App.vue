<template>
  <v-skeleton-loader v-if="$store.state.auth.isAuthPending"/>
  <app-layout v-else-if="$store.state.auth.isAuthenticated">
    <router-view/>
  </app-layout>
  <blank-layout v-else>
    <login-page/>
  </blank-layout>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AppLayout from '~/layouts/app-layout.vue';
import BlankLayout from '~/layouts/blank-layout.vue';
import LoginPage from '~/pages/login.page.vue';

@Component({
  components: {BlankLayout, AppLayout, LoginPage},
})
export default class App extends Vue {
  async created() {
    this.$store.state.app.showNavigation = this.$vuetify.breakpoint.mdAndUp;
    await this.$store.dispatch('auth/loginByToken');
    moment.locale(this.$i18n.locale);
    await this.$store.dispatch('user/updateState');
  }
}
</script>

<style lang="scss">
@import "styles";
</style>
