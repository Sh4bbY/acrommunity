<template>
  <v-row>
    <v-col v-for="(pose, idx) in flow" :key="pose.name + idx" cols="12" sm="6" md="4" lg="3">
      <v-sheet outlined rounded class="pa-1">
        <h4 class="text-center">{{ idx + 1}}. {{ pose.name }}</h4>
        <v-img :src="pose.attachments[0].url"/>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {IPose} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FlowGeneratorResult extends Vue {
  @Prop({type: Array, default: () => []}) flow: IPose[];
}
</script>

<style lang="scss" scoped>
</style>
