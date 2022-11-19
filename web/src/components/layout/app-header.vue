<template>
  <v-app-bar app clipped-left dark color="primary" short :hide-on-scroll="$vuetify.breakpoint.xs">
    <v-app-bar-nav-icon @click="onNavIconClick" class="mr-3"/>
    <router-link :to="{name: 'home'}" class="d-inline-flex">
      <v-img src="/img/logo.png" max-height="40" max-width="140" contain/>
    </router-link>

    <v-spacer/>

    <v-btn color="secondary" rounded @click="$store.dispatch('app/showFeedbackDialog')" min-width="36px" :class="{'px-0': $vuetify.breakpoint.xs}">
      <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-chat-alert</v-icon>
      <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('label.feedback') }}</span>
    </v-btn>

    <v-spacer/>

    <user-menu v-if="$store.state.auth.isSignedIn"/>
    <v-menu v-else offset-y>
      <template #activator="{on}">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$store.dispatch('app/login')">
          <v-list-item-title>{{ $t('action.login') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$store.dispatch('app/register')">
          <v-list-item-title>{{ $t('action.register') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import UserMenu from '~/components/layout/user-menu.vue';

@Component({
  components: {UserMenu},
})
export default class UserHeader extends Vue {
  onNavIconClick() {
    this.$store.dispatch('app/toggleNavigation');
  }
}
</script>

<style lang="scss" scoped>
.navigation-title {
  color: #203261;
  font-weight: bold;
  font-size: 24px;
}
</style>
