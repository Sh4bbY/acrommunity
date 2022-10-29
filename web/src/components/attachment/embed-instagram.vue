<template>
  <div class="embed-instagram">
    <v-hover v-if="showThumbnail" v-slot="{hover}">
      <div class="thumbnail-wrapper">
        <v-img :src="thumbnail"/>
        <div v-show="hover" class="thumbnail-hint" @click="embedInstagram">
          <v-icon color="#fff" class="mr-2">mdi-instagram</v-icon>
          <span>embed instagram</span>
        </div>
      </div>
    </v-hover>
    <blockquote v-else class="instagram-media" :data-instgrm-permalink="url" data-instgrm-version="14"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

declare global {
  interface Window {
    instgrm: any;
  }
}

@Component
export default class EmbedInstagram extends Vue {
  @Prop({type: String, required: true}) url!: string;
  @Prop({default: false, type: Boolean}) noThumbnail!: boolean;
  checkIterations = 0;
  disableThumbnail = false;

  async mounted() {
    if (this.disableThumbnail) {
      await this.embedInstagram();
    }
  }

  async embedInstagram() {
    this.disableThumbnail = true;
    this.insertScript();
    await this.scriptLoaded();
    window.instgrm.Embeds.process();
  }

  insertScript() {
    if (window.instgrm) {
      return;
    }
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
  }

  async scriptLoaded() {
    if (window.instgrm) {
      return true;
    }
    if (++this.checkIterations > 100) {
      return false;
    }

    await new Promise(resolve => window.setTimeout(resolve, 10));
    return this.scriptLoaded();
  }

  get mediaId() {
    const instagramPrefix = 'https://www.instagram.com/p/';

    if (this.url.startsWith(instagramPrefix)) {
      return this.url.substr(instagramPrefix.length);
    }
    return undefined;
  }

  get showThumbnail() {
    return !this.noThumbnail && !this.disableThumbnail;
  }

  get thumbnail() {
    return `/api/proxy/instagram/media/${this.mediaId}?size=m`;
  }
}
</script>

<style lang="scss">
.instagram-media {
  background: #FFF;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15);
  margin: 1px;
  max-width: 540px;
  //min-width: 326px;
  padding: 0;
  width: 99.375%;
  width: -webkit-calc(100% - 2px);
  width: calc(100% - 2px);
}

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

.embed-instagram {
  overflow: hidden;
}
</style>
