<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-select v-model="settings.basePositions" :label="$t('field.basePosition')" :items="basePositions" multiple clearable hide-details/>
        </v-col>
        <v-col cols="12" md="6">
          <v-select v-model="settings.flyerPositions" :label="$t('field.flyerPosition')" :items="flyerPositions" multiple clearable hide-details/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="settings.numberPoses" :label="$t('flowGenerator.numberPoses')" type="number" hide-details/>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex px-2 mb-2 align-center">
            <span>{{ $t('field.difficulty') }}</span>
            <v-spacer/>
            <span>{{ difficultyLabel }}</span>
          </div>
          <v-range-slider v-model="settings.difficulty" min="1" max="10" hide-details/>
        </v-col>
        <v-col cols="12" md="6" v-if="false">
          <v-checkbox v-model="settings.isWashingMachine" :label="$t('flowGenerator.isWashingMachine')"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete v-model="settings.startPoseId" :label="$t('flowGenerator.startPose')" :items="availablePoses" item-text="name" item-value="id" clearable/>
        </v-col>
        <v-col cols="12" md="6" v-if="false">
          <v-autocomplete v-if="settings.isWashingMachine" :value="settings.startPoseId" :label="$t('flowGenerator.endPose')" :items="availablePoses" item-text="name"
                          item-value="id" disabled/>
          <v-autocomplete v-else v-model="settings.endPoseId" :label="$t('flowGenerator.endPose')" :items="availablePoses" item-text="name" item-value="id" clearable/>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-spacer/>
          <v-btn color="primary" @click="generate">{{ $t('action.generate') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition, IFlowGeneratorSettings, IPose} from '@acrommunity/common';
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';
import {resolveDifficulty} from '~/utils';

@Component
export default class FlowGeneratorSettings extends Vue {
  @VModel() settings: IFlowGeneratorSettings;

  poses: IPose[] = [];

  async mounted() {
    const response = await this.$api.get('/api/poses/options');
    this.poses = response.data;
  }

  get basePositions() {
    return Object.values(BasePosition).map(value => ({text: this.$t('basePosition.' + value), value}));
  }

  get flyerPositions() {
    return Object.values(FlyerPosition).map(value => ({text: this.$t('flyerPosition.' + value), value}));
  }

  get difficultyLabel() {
    return `${resolveDifficulty(this.settings.difficulty[0], this)} ${this.$t('label.to')} ${resolveDifficulty(this.settings.difficulty[1], this)}`;
  }

  get availablePoses() {
    return this.poses.filter(p => p.difficulty >= this.settings.difficulty[0] && p.difficulty <= this.settings.difficulty[1]
        && (this.settings.basePositions.length === 0 || this.settings.basePositions.includes(p.basePosition))
        && (this.settings.flyerPositions.length === 0 || this.settings.flyerPositions.includes(p.flyerPosition)),
    );
  }

  generate() {
    this.$emit('generate');
  }
}
</script>

<style lang="scss" scoped>
</style>
