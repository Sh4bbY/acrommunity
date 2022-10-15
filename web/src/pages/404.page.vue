<template>
  <v-container class="mt-2">
    <v-alert type="warning">{{ $t('error.pageNotFound', {page: $route.path}) }}</v-alert>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Page from './page.vue';

@Component
export default class NotFoundPage extends Page {
  get title() {
    return 'Not Found';
  }
}
</script>
