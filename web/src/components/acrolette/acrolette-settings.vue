<template>
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{ $t('label.acrolette') }} - Settings</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-sheet outlined rounded class="pa-2">
            <v-radio-group v-model="settings.switch.type" label="Next Image" class="mt-0" hide-details>
              <v-radio value="button" label="Button"/>
              <div class="d-flex">
                <v-radio value="timer" label="Timer" class="mr-5"/>
                <v-text-field v-model="settings.switch.duration" label="Timer Duration" :disabled="settings.switch.type !== 'timer'" type="number">
                  <template #append>sek</template>
                </v-text-field>
              </div>
            </v-radio-group>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet outlined rounded class="pa-2">
            <h3>{{ $tc('p.pose', 2) }}</h3>
            <v-select v-model="settings.poses.basePositions" :label="$t('field.basePosition')" :items="basePositions" multiple/>
            <v-autocomplete v-model="settings.poses.startPoseId" :label="$tc('flowGenerator.startPose')" :items="availablePoses" item-value="id" item-text="name" clearable/>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet outlined rounded class="pa-2">
            <div class="d-flex px-2 mb-2 align-center">
              <h3>{{ $t('field.difficulty') }}</h3>
              <v-spacer/>
              <span>{{ difficultyLabel }}</span>
            </div>
            <v-range-slider v-model="settings.difficulty" min="1" max="6"/>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet outlined rounded class="pa-2">
            <h3>{{ $t('label.misc') }}</h3>
            <v-checkbox v-model="settings.playSound" :label="$t('acrolette.settings.playSound')"/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="$emit('start')">{{ 'Starten' }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition, IPose} from '@acrommunity/common';
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';
import {IAcroletteSettings} from '~/components/acrolette/IAcroletteSettings';
import {resolveDifficulty} from '~/utils';

@Component
export default class AcroletteSettings extends Vue {
  @VModel() settings: IAcroletteSettings;
  poseOptions: IPose[] = [];

  async mounted() {
    const response = await this.$api.get('/api/acrolette/pose-options');
    this.poseOptions = response.data;
  }

  get basePositions() {
    return Object.values(BasePosition).map(value => ({text: this.$t('basePosition.' + value), value}));
  }

  get flyerPositions() {
    return Object.values(FlyerPosition).map(value => ({text: this.$t('flyerPosition.' + value), value}));
  }

  get availablePoses() {
    return this.poseOptions.filter(pose => pose.difficulty >= this.settings.difficulty[0] && pose.difficulty <= this.settings.difficulty[1]);
  }

  get difficultyLabel() {
    return `${resolveDifficulty(this.settings.difficulty[0], this)} ${this.$t('label.to')} ${resolveDifficulty(this.settings.difficulty[1], this)}`;
  }
}
</script>
