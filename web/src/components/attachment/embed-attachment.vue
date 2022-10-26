<template>
  <div>
    <v-img v-if="attachment.type === AttachmentType.Image" :src="attachment.url" contain/>
    <embed-instagram v-else-if="attachment.type === AttachmentType.Instagram" :url="attachment.url"/>
    <embed-youtube v-else-if="attachment.type === AttachmentType.YouTube" :url="attachment.url"/>
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

  get AttachmentType() {
    return AttachmentType;
  }
}
</script>

<style lang="scss">
</style>
