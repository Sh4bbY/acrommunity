<template>
  <v-dialog v-model="show" width="auto" :fullscreen="fullscreen" transition="dialog-bottom-transition">
    <v-card v-if="item" class="d-flex flex-column">
      <div class="buttons">
        <item-menu v-if="$store.state.auth.isSignedIn" :item="item" :type="type"/>
        <v-btn v-if="fullscreen" icon @click="show=false" color="black" class="ml-2">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <img v-if="type === 'image'" :src="item.url" style="max-height: 500px; max-width: 100%"/>
      <div v-else-if="type === 'video'" class="d-flex justify-center align-center">
        <video v-if="show" :src="item.url" height="500px" controls style="max-height: 500px; max-width: 100%" autoplay/>
      </div>
      <div class="d-flex flex-wrap justify-space-between">
        <div class="pa-2 text-center relative">
          <a :href="'https://www.instagram.com/' + item.copyright" target="_blank" style="font-size: 14px">&copy;{{ item.copyright }}</a>
        </div>

        <div class="pa-2">
          <span v-if="$store.state.auth.isSignedIn">
            <fav-button :item="item" :type="type" small/>
            <working-on-button :item="item" :type="type" small/>
            <repertoire-button :item="item" :type="type" small/>
          </span>
          <tooltip-button :tooltip="$t('action.shareItem', {item: $tc('p.' + type)})" icon="mdi-share-variant" small @click="share(item)"/>
        </div>
      </div>
      <v-spacer/>
      <div class="d-flex align-center">
        <v-btn v-if="!isFirst" icon @click="$emit('prev')">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer/>
        <a :href="'https://www.instagram.com/p/' + item.mediaId" target="_blank" style="font-size: 14px">{{ 'instagram.com/p/' + item.mediaId }}</a>
        <v-spacer/>
        <v-btn v-if="!isLast" icon @click="$emit('next')">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <v-card-text class="pa-2">
        <div class="d-flex justify-space-between">
          <div>{{ $tc('p.person', 2) }}: <span>{{ item.persons }}</span></div>
          <div>{{ $tc('p.base', 2) }}: <span>{{ item.bases }}</span></div>
          <div>{{ $t('label.baseType') }}: <span>{{ item.baseType }}</span></div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, VModel} from 'vue-property-decorator';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import RepertoireButton from '~/components/item/repertoire-button.vue';
import WorkingOnButton from '~/components/item/working-on-button.vue';

@Component({
  components: {TooltipButton, ItemMenu, FavButton, WorkingOnButton, RepertoireButton},
})
export default class MediaDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;
  @Prop({type: Boolean, default: false}) isFirst: boolean;
  @Prop({type: Boolean, default: false}) isLast: boolean;
  @Prop({type: Boolean, default: false}) fullscreen: boolean;
  @Prop() item: any;
  @Prop() type: 'video' | 'image';

  keyUpListenerRef = null;

  mounted() {
    this.keyUpListenerRef = this.handleKeyUp.bind(this);
    document.addEventListener('keyup', this.keyUpListenerRef);
  }

  handleKeyUp(e) {
    if (e.code === 'ArrowLeft' && !this.isFirst) {
      return this.$emit('prev');
    }
    if (e.code === 'ArrowRight' && !this.isLast) {
      return this.$emit('next');
    }
  }

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUpListenerRef);
  }

  async share(media) {
    try {
      const itemType = this.$tc('p.' + this.type);
      await navigator.share({
        title: 'Acro-' + itemType,
        text: this.$t('msg.shareMediaText', {item: itemType, owner: media.copyright}).toString(),
        url: media.url,
      });
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>
