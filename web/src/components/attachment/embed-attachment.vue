<template>
  <div v-if="attachment" class="embed-attachment">
    <v-img v-if="attachment.type === AttachmentType.Image" :src="attachment.url" contain/>
    <embed-instagram v-else-if="attachment.type === AttachmentType.Instagram" :url="attachment.url"/>
    <embed-youtube v-else-if="attachment.type === AttachmentType.YouTube" :url="attachment.url" :height="height" :width="width" :max-height="maxHeight" :max-width="maxWidth"
                   :non-clickable="nonClickable"/>
  </div>
</template>

<script lang="ts">
import {AttachmentType, IAttachment} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import EmbedInstagram from '~/components/attachment/embed-instagram.vue';
import EmbedYoutube from '~/components/attachment/embed-youtube.vue';

@Component({
  components: {EmbedInstagram, EmbedYoutube},
})
export default class EmbedAttachment extends Vue {
  @Prop({required: true}) attachment!: IAttachment;
  @Prop({type: Boolean, default: false}) nonClickable!: boolean;
  @Prop() height!: number | string;
  @Prop() width!: number | string;
  @Prop() maxHeight!: number | string;
  @Prop() maxWidth!: number | string;

  get AttachmentType() {
    return AttachmentType;
  }
}
</script>

<style lang="scss">
.embed-attachment {
  max-width: 100%;
}
</style>
