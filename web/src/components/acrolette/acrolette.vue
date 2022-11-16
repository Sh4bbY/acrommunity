<template>
  <acrolette-settings v-if="!isGameStarted" v-model="settings" @start="startGame()"/>
  <acrolette-game v-else :settings="settings" @end="isGameStarted = false"/>
</template>

<script lang="ts">
import {BasePosition} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AcroletteGame from '~/components/acrolette/acrolette-game.vue';
import AcroletteSettings from '~/components/acrolette/acrolette-settings.vue';
import {IAcroletteSettings} from '~/components/acrolette/IAcroletteSettings';

@Component({
  components: {AcroletteSettings, AcroletteGame},
})
export default class Acrolette extends Vue {
  isGameStarted = false;
  settings: IAcroletteSettings = {
    difficulty: [1, 3],
    playSound: true,
    switch: {
      autoLoad: true,
      duration: 30,
    },
    poses: {
      basePositions: [BasePosition.LYING_ON_BACK, BasePosition.STANDING, BasePosition.SITTING],
      startPoseId: null,
    },
  };

  startGame() {
    localStorage.setItem('acrolette-settings', JSON.stringify(this.settings));
    this.isGameStarted = true;
  }

  mounted() {
    try {
      const settingsJson = localStorage.getItem('acrolette-settings');
      if (settingsJson) {
        const settings = JSON.parse(settingsJson);
        Object.keys(this.settings).forEach(key => this.settings[key] = settings[key]);
      }
    } catch (e) {
      console.log('could not load settings from localstorage');
    }
  }
}
</script>
