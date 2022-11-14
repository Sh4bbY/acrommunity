<template>
  <v-progress-linear v-if="show" indeterminate absolute class="loading-indicator" color="orange" v-bind="$attrs"/>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class LoadingIndicator extends Vue {
  @Prop({default: false, type: Boolean}) loading!: boolean;
  @Prop({default: true, type: Boolean}) onRequest!: boolean;

  get hasOpenRequests(): boolean {
    return this.$store.state.app.openRequests > 0;
  }

  get show(): boolean {
    return this.onRequest && this.$store.state.app.openRequests > 0 || this.loading;
  }
}
</script>

<style lang="scss" scoped>
.loading-indicator {
  z-index: 10;
  height: 4px;
}
</style>
