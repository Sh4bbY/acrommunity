<template>
  <v-card>
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{ $t('label.acrolette') }}</v-toolbar-title>
      <v-spacer/>
      <span v-if="useTimer">{{ timer }}</span>
    </v-toolbar>
    <v-progress-linear v-if="useTimer" v-model="timerProgress" color="amber" height="25"/>
    <v-card-text>
      <div class="d-flex align-center justify-center mb-5">
        <h1 class="text-center mr-3" v-if="pose">{{ pose.name }}</h1>
        <v-btn icon :to="{name: 'pose-details', params: {id: pose.id}}">
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <v-img contain :src="imageUrl" max-height="400px"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="getNextPose">{{ 'Nächste Pose' }}</v-btn>
      <v-btn @click="togglePause">{{ isPaused ? 'Weiter' : 'Pause' }}</v-btn>
      <v-btn color="primary" @click="$emit('end')">{{ 'Beenden' }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {IAcroletteSettings} from '~/components/acrolette/IAcroletteSettings';

@Component
export default class AcroletteGame extends Vue {
  @Prop({type: Object, default: () => ({})}) settings: IAcroletteSettings;
  isPaused = false;
  timerValue = 0;
  pose = null;
  intervalId = null;
  speechSynthesis: SpeechSynthesisUtterance = null;

  mounted() {
    if (this.useTimer) {
      this.timerValue = this.settings.switch.duration;
      this.intervalId = window.setInterval(() => this.update(), 1000);
    }

    this.speechSynthesis = new SpeechSynthesisUtterance();
    this.speechSynthesis.lang = 'en-US';
    this.speechSynthesis.volume = 0.7;

    this.fetchPose();
  }

  beforeDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  update() {
    if (this.isPaused) {
      return;
    }
    this.timerValue--;

    if (this.timerValue === 0) {
      this.getNextPose();
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  async getNextPose() {
    await this.fetchPose();

    this.timerValue = this.settings.switch.duration;
  }

  async fetchPose() {
    try {
      const params: any = {};
      if (this.pose) {
        params.current = this.pose.id;
      }
      params.basePositions = this.settings.poses.basePositions;
      params.flyerPositions = this.settings.poses.flyerPositions;
      params.validTransitions = this.settings.transitions.onlyValid;
      params.difficulty = this.settings.difficulty;

      const response = await this.$api.get(`/api/acrolette/pose`, {params});
      this.pose = response.data;
      this.speechSynthesis.text = this.pose.name;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(this.speechSynthesis);
    } catch (err) {
      this.$notify.error(err);
    }
  }

  get useTimer(): boolean {
    return this.settings.switch.type === 'timer';
  }

  get timer() {
    return this.timerValue;
  }

  get timerProgress() {
    return this.timerValue / this.settings.switch.duration * 100;
  }

  get imageUrl() {
    if (this.pose) {
      return this.pose.attachments[0]?.url;
    }
    return '';
  }
}
</script>
