<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $t('label.flowGenerator') }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form>
          <v-row v-show="showSettings">
            <v-col cols="12" md="6" class="pb-1">
              <v-select v-model="settings.basePositions" :label="$t('field.basePosition')" :items="basePositions" multiple clearable hide-details @change="updatePoses"/>
            </v-col>
            <!--        <v-col cols="12" md="6">-->
            <!--          <v-select v-model="settings.flyerPositions" :label="$t('field.flyerPosition')" :items="flyerPositions" multiple clearable hide-details @change="updatePoses"/>-->
            <!--        </v-col>-->
            <v-col cols="12" md="6" class="pb-1">
              <div class="d-flex px-2 mb-2 align-center">
                <span>{{ $t('field.difficulty') }}</span>
                <v-spacer/>
                <span>{{ difficultyLabel }}</span>
              </div>
              <v-range-slider v-model="settings.difficulty" min="1" max="6" hide-details/>
            </v-col>
            <v-col cols="12" md="6" class="pb-1">
              <v-text-field v-model="settings.numberPoses" :label="$t('flowGenerator.numberPoses')" type="number" :max="100" hide-details/>
            </v-col>
            <v-col cols="12" md="6" class="pb-1">
              <v-checkbox v-model="settings.isWashingMachine" :label="$t('flowGenerator.isWashingMachine')" hide-details/>
            </v-col>
            <v-col cols="12" md="6" class="pb-1">
              <v-autocomplete v-model="settings.startPoseId" :label="$t('flowGenerator.startPose')" :items="availablePoses" item-text="name" item-value="id" clearable/>
            </v-col>
            <v-col cols="12" md="6" class="pb-1">
              <v-autocomplete v-if="settings.isWashingMachine" :value="settings.startPoseId" :label="$t('flowGenerator.endPose')" :items="availablePoses" item-text="name"
                              item-value="id" disabled/>
              <v-autocomplete v-else v-model="settings.endPoseId" :label="$t('flowGenerator.endPose')" :items="availablePoses" item-text="name" item-value="id" clearable
                              @change="checkForWashingMachine"/>
            </v-col>
            <v-col cols="12" class="pt-0">
              <span>{{ $t('label.availablePoses') }}: {{ availablePoses.length }}</span>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="12" sm="6" class="d-flex align-center pt-0">
              <v-btn text @click="showSettings = !showSettings">
                <v-icon left>{{ showSettings ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                {{ $t('label.settings') }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center pt-0">
              <v-spacer/>
              <v-btn color="primary" @click="generate">{{ $t('action.generate') }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {BasePosition, IFlowGeneratorSettings, IPose} from '@acrommunity/common';
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';
import {resolveDifficulty} from '~/utils';

@Component
export default class FlowGeneratorSettings extends Vue {
  @VModel() settings: IFlowGeneratorSettings;

  showSettings = false;
  poses: IPose[] = [];

  async mounted() {
    const response = await this.$api.get('/api/flow-generator/pose-options');
    this.poses = response.data;
  }

  get basePositions() {
    return Object.values(BasePosition)
        .filter(value => ![BasePosition.HANDSTAND, BasePosition.LYING_ON_BELLY].includes(value)) // excludes
        .map(value => ({text: this.$t('basePosition.' + value), value}));
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

  updatePoses() {
    if (!this.availablePoses.find(pose => pose.id === this.settings.startPoseId)) {
      this.settings.startPoseId = null;
    }
    if (!this.availablePoses.find(pose => pose.id === this.settings.endPoseId)) {
      this.settings.endPoseId = null;
    }
  }

  checkForWashingMachine() {
    this.settings.isWashingMachine = this.settings.endPoseId === this.settings.startPoseId;
  }

  generate() {
    this.$emit('generate');
  }
}
</script>

<style lang="scss" scoped>
</style>
