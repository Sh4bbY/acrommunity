<template>
  <div>
    <flow-generator-settings v-model="settings" @generate="onGenerate"/>

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
    numberPoses: 8,
    isWashingMachine: true,
    startPoseId: 1,
    endPoseId: null,
    difficulty: [1, 3],
    basePositions: [BasePosition.LYING_ON_BACK, BasePosition.STANDING, BasePosition.SITTING],
    flyerPositions: [],
  };
  flow = null;

  async onGenerate() {
    try {
      const payload = {
        ...this.settings,
        endPoseId: this.settings.isWashingMachine ? this.settings.startPoseId : this.settings.endPoseId,
      };
      const response = await this.$api.post('/api/flow-generator/generate', payload);
      this.flow = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
