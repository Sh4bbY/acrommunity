<template>
  <v-app-bar app clipped-left dark color="primary" short>
    <v-img src="/img/logo.png" max-height="40" max-width="100" contain/>
    <v-app-bar-title>{{ $store.state.app.title }}</v-app-bar-title>
    <v-spacer/>
    <v-btn text :to="{name: 'register'}" class="mr-2" :disabled="$route.name === 'register'">{{ $t('action.register') }}</v-btn>
    <v-btn text :to="{name: 'login'}" :disabled="$route.name === 'login'">{{ $t('action.login') }}</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({})
export default class GuestHeader extends Vue {
}
</script>
