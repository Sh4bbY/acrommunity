<template>
  <v-row>
    <v-col v-for="(pose, idx) in flow" :key="pose.name + idx" cols="12" sm="6" md="4" lg="3">
      <v-sheet outlined rounded class="pa-1">
        <h4 class="text-center">{{ idx + 1 }}.
          <router-link :to="{name: 'pose-details', params: {id: pose.id}}">{{ pose.name }}</router-link>
        </h4>
        <v-img :src="getUrl(pose.attachments)"/>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {IAttachment, IPose} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FlowGeneratorResult extends Vue {
  @Prop({type: Array, default: () => []}) flow: IPose[];

  getUrl(attachments: IAttachment[]) {
    const sorted = attachments.slice().sort((a, b) => a.id < b.id ? -1 : 1);
    return sorted[0].url;
  }
}
</script>

<style lang="scss" scoped>
</style>
