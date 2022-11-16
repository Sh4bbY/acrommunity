<template>
  <v-card ref="gameContainer" :height="isFullscreen ? documentHeight : undefined" class="d-flex flex-column">
    <v-toolbar color="primary" dense dark class="flex-grow-0">
      <v-toolbar-title>{{ $t('label.acrolette') }}</v-toolbar-title>
      <v-spacer/>
      <span v-if="settings.switch.autoLoad">{{ timer }}</span>
    </v-toolbar>
    <v-progress-linear v-if="settings.switch.autoLoad" v-model="timerProgress" color="amber" height="25"/>
    <v-card-text v-if="pose">
      <div class="d-flex align-center justify-center mb-5">
        <h1 class="text-center mr-3" v-if="pose">{{ pose.name }}</h1>
        <v-btn icon :to="{name: 'pose-details', params: {id: pose.id}}">
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <v-img contain :src="imageUrl" max-height="400px"/>
    </v-card-text>
    <v-spacer/>
    <v-card-actions>
      <div class="d-flex justify-space-between w-100">
        <tooltip-button :tooltip="isMuted ? 'Unmute' : 'Mute'" :icon="isMuted ? 'mdi-volume-off' : 'mdi-volume-high'" @click="toggleSound"/>
        <tooltip-button :tooltip="isPaused ? 'Weiter' : 'Pause'" :icon="isPaused ? 'mdi-play' : 'mdi-pause'" @click="togglePause"/>
        <tooltip-button tooltip="Nächste Pose" icon="mdi-fast-forward" @click="getNextPose"/>
        <tooltip-button :tooltip="isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'" :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'" @click="toggleFullscreen"/>
        <tooltip-button tooltip="Beenden" icon="mdi-exit-run" @click="$emit('end')"/>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {IAcroletteSettings} from '~/components/acrolette/IAcroletteSettings';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {TooltipButton},
})
export default class AcroletteGame extends Vue {
  @Prop({type: Object, default: () => ({})}) settings: IAcroletteSettings;
  isPaused = false;
  timerValue = 0;
  pose = null;
  intervalId = null;
  speechSynthesis: SpeechSynthesisUtterance = null;
  isFullscreen = false;
  documentHeight = 500;
  isMuted = false;

  mounted() {
    if (this.settings.switch.autoLoad) {
      this.timerValue = this.settings.switch.duration;
      this.intervalId = window.setInterval(() => this.update(), 1000);
    }
    this.isMuted = !this.settings.playSound;


    this.speechSynthesis = new SpeechSynthesisUtterance();
    this.speechSynthesis.lang = 'en-GB';
    this.speechSynthesis.volume = 1;
    this.speechSynthesis.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.speechSynthesis.voice = voices[6];
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        this.speechSynthesis.voice = voices[6];
      };
    }

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
      } else if (this.settings.poses.startPoseId) {
        params.startPoseId = this.settings.poses.startPoseId;
      }
      params.basePositions = this.settings.poses.basePositions;
      params.difficulty = this.settings.difficulty;

      const response = await this.$api.get(`/api/acrolette/pose`, {params});
      this.pose = response.data;

      if (!this.isMuted) {
        this.speechSynthesis.text = this.pose.name;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(this.speechSynthesis);
      }

    } catch (err) {
      this.$notify.error(err);
    }
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


  async toggleFullscreen() {
    if (this.isFullscreen) {
      await document.exitFullscreen();
    } else {
      await (this.$refs.gameContainer as any).$el.requestFullscreen();
      this.documentHeight = document.body.clientHeight;
    }
    this.isFullscreen = !this.isFullscreen;
  }

  async toggleSound() {
    this.isMuted = !this.isMuted;
  }
}
</script>
