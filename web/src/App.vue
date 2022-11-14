<template>
  <v-skeleton-loader v-if="$store.state.auth.isAuthPending"/>
  <admin-layout v-else-if="$store.state.auth.isAdmin">
    <router-view/>
  </admin-layout>
  <user-layout v-else-if="$store.state.auth.isSignedIn">
    <router-view/>
  </user-layout>
  <guest-layout v-else>
    <router-view v-if="!['admin','user'].includes($route.meta.access)"/>
  </guest-layout>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AdminLayout from '~/layouts/admin-layout.vue';
import BlankLayout from '~/layouts/blank-layout.vue';
import GuestLayout from '~/layouts/guest-layout.vue';
import UserLayout from '~/layouts/user-layout.vue';
import LoginPage from '~/pages/auth/login.page.vue';

@Component({
  components: {BlankLayout, AdminLayout, UserLayout, GuestLayout, LoginPage},
})
export default class App extends Vue {
  async created() {
    this.$store.state.app.showNavigation = this.$vuetify.breakpoint.smAndUp;
    await this.$store.dispatch('auth/loginByToken');
    moment.locale(this.$i18n.locale);
  }
}
</script>

<style lang="scss">
@import "styles";
</style>
