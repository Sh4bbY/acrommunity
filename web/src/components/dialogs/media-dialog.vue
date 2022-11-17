<template>
  <v-dialog v-model="show" width="auto" :fullscreen="fullscreen" transition="dialog-bottom-transition">
    <v-card v-if="item" class="d-flex flex-column">
      <v-btn v-if="fullscreen" icon @click="show=false" class="close-btn" color="black">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <img v-if="type === 'image'" :src="item.url" style="max-height: 500px; max-width: 100%"/>
      <div v-else-if="type === 'video'" class="d-flex justify-center align-center">
        <video v-if="show" :src="item.url" height="500px" controls style="max-height: 500px; max-width: 100%" autoplay/>
      </div>
      <div class="pa-2 text-center">
        <a :href="'https://www.instagram.com/' + item.copyright" target="_blank" style="font-size: 14px">&copy;{{ item.copyright }}</a>
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

@Component({
  components: {},
})
export default class MediaDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;
  @Prop({type: Boolean, default: false}) isFirst: boolean;
  @Prop({type: Boolean, default: false}) isLast: boolean;
  @Prop({type: Boolean, default: false}) fullscreen: boolean;
  @Prop() item: any;
  @Prop() type: 'video' | 'image';
}
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>
