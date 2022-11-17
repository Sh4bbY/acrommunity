<template>
  <v-app-bar app clipped-left dark color="primary" short :hide-on-scroll="$vuetify.breakpoint.xs">
    <router-link :to="{name: 'landing'}" class="d-inline-flex">
      <v-img src="/img/logo.png" max-height="40" max-width="40" contain/>
      <v-app-bar-title class="navigation-title pt-3">crommunity</v-app-bar-title>
    </router-link>
    <v-spacer/>
    <v-menu offset-y>
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

@Component({})
export default class GuestHeader extends Vue {
}
</script>

<style lang="scss" scoped>
.navigation-title {
  color: #24396d;
  font-weight: bold;
  font-size: 24px;
}
</style>
