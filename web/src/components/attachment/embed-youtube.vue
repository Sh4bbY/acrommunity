<template>
  <div ref="wrapper">
    <v-hover v-if="showThumbnail" v-slot="{hover}">
      <div class="thumbnail-wrapper">
        <v-img :src="thumbnail" :style="style" contain/>
        <div v-show="hover" class="thumbnail-hint" @click="onClick">
          <v-icon color="#fff" class="mr-2">mdi-youtube</v-icon>
          <span>embed youtube</span>
        </div>
      </div>
    </v-hover>
    <iframe v-else :width="width === 'auto' ? '100%' : width" :height="computedHeight" :src="embedUrl" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class EmbedYoutube extends Vue {
  @Prop({type: String, required: true}) url!: string;
  @Prop({type: Boolean, default: false}) noThumbnail!: boolean;
  @Prop({type: String, default: 'auto'}) height!: string;
  @Prop({type: String, default: 'auto'}) width!: string;
  @Prop({type: String, default: 'auto'}) maxHeight!: string;
  @Prop({type: String, default: 'auto'}) maxWidth!: string;
  @Prop({type: Boolean, default: false}) nonClickable!: boolean;

  disableThumbnail = false;

  get style() {
    return {height: this.height, width: this.width, maxWidth: this.maxWidth, maxHeight: this.maxHeight};
  }

  get embedUrl() {
    return 'https://www.youtube-nocookie.com/embed/' + this.videoId;
  }

  get videoId() {
    const youtubePrefix = 'https://www.youtube.com/watch?v=';
    const youtubeShortPrefix = 'https://www.youtube.com/shorts/';
    const youtubeNoCookiePrefix = 'https://www.youtube-nocookie.com/embed/';

    if (this.url.startsWith(youtubePrefix)) {
      return this.url.substr(youtubePrefix.length);
    }

    if (this.url.startsWith(youtubeShortPrefix)) {
      return this.url.substr(youtubeShortPrefix.length);
    }

    if (this.url.startsWith(youtubeNoCookiePrefix)) {
      return this.url.substr(youtubeNoCookiePrefix.length);
    }

    return '';
  }

  // get height(): number {
  //   return (this.$refs.wrapper as HTMLElement).clientWidth * 3 / 4;
  // }

  onClick() {
    if (!this.nonClickable) {
      this.disableThumbnail = true;
    }
  }

  get showThumbnail(): boolean {
    return !this.noThumbnail && !this.disableThumbnail;
  }

  get thumbnail(): string {
    return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }

  get computedHeight() {
    if (this.height === 'auto') {
      const el = this.$refs.wrapper as HTMLElement;
      return el ? el.clientHeight + 'px' : this.height;
    }
    return this.height;
  }
}
</script>

<style lang="scss" scoped>
.thumbnail-wrapper {
  position: relative;
}

.thumbnail-hint {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  background-color: rgba(#fff, 0.2);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  cursor: pointer;
}
</style>
