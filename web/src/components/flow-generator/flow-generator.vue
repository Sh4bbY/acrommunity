<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $t('label.flowGenerator') }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <flow-generator-settings v-model="settings" @generate="onGenerate"/>
      </v-card-text>
    </v-card>

    <v-sheet v-if="flow" class="mt-5">
      <flow-generator-result :flow="flow"/>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import {BasePosition, IFlowGeneratorSettings} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FlowGeneratorResult from '~/components/flow-generator/flow-generator-result.vue';
import FlowGeneratorSettings from '~/components/flow-generator/flow-generator-settings.vue';

@Component({
  components: {FlowGeneratorSettings, FlowGeneratorResult},
})
export default class FlowGenerator extends Vue {
  settings: IFlowGeneratorSettings = {
    numberPoses: 6,
    isWashingMachine: false,
    startPoseId: 1,
    endPoseId: null,
    difficulty: [1, 10],
    basePositions: [BasePosition.LYING_ON_BACK],
    flyerPositions: [],
  };
  flow = null;

  async onGenerate() {
    try {
      const response = await this.$api.post('/api/flow-generator/generate', this.settings);
      this.flow = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
