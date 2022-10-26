<template>
  <acrolette-settings v-if="!isGameStarted" v-model="settings" @start="isGameStarted = true"/>
  <acrolette-game v-else :settings="settings" @end="isGameStarted = false"/>
</template>

<script lang="ts">
import {BasePosition} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AcroletteGame from '~/components/acrolette/acrolette-game.vue';
import AcroletteSettings from '~/components/acrolette/acrolette-settings.vue';

@Component({
  components: {AcroletteSettings, AcroletteGame},
})
export default class Acrolette extends Vue {
  isGameStarted = false;
  settings = {
    difficulty: [1, 10],
    sound: {
      onSwitch: true,
    },
    switch: {
      type: 'timer',
      duration: 60,
    },
    poses: {
      basePositions: [BasePosition.LYING_ON_BACK],
      flyerPositions: [],
      exclude: [],
    },
    transitions: {
      onlyValid: false,
    },
  };
}
</script>
