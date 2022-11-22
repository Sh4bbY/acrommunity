<template>
  <acroulette-settings v-if="!isGameStarted" v-model="settings" @start="startGame()"/>
  <acroulette-game v-else :settings="settings" @end="isGameStarted = false"/>
</template>

<script lang="ts">
import {BasePosition} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AcrouletteGame from '~/components/acroulette/acroulette-game.vue';
import AcrouletteSettings from '~/components/acroulette/acroulette-settings.vue';
import {IAcrouletteSettings} from '~/components/acroulette/IAcrouletteSettings';

@Component({
  components: {AcrouletteSettings, AcrouletteGame},
})
export default class Acroulette extends Vue {
  isGameStarted = false;
  settings: IAcrouletteSettings = {
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
    localStorage.setItem('acroulette-settings', JSON.stringify(this.settings));
    this.isGameStarted = true;
  }

  mounted() {
    try {
      const settingsJson = localStorage.getItem('acroulette-settings');
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
