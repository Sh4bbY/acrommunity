<template>
  <tooltip-button color="orange" :small="small" :disabled="isRequesting"
                  :tooltip="isInRepertoire ? $t('action.removeFromItems', {items: $t('label.repertoire')}) : $t('action.addToItems', {items: $t('label.repertoire')})"
                  :icon="isInRepertoire ? 'mdi-arm-flex' : 'mdi-arm-flex-outline'" @click="toggleMark"/>
</template>

<script lang="ts">
import {MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {TooltipButton},
})
export default class RepertoireButton extends Vue {
  @Prop({type: String, required: true}) type: string;
  @Prop({type: Object, required: true}) item: any;
  @Prop({type: Boolean, default: false}) small: any;

  isRequesting = false;

  async toggleMark() {
    try {
      this.isRequesting = true;
      await this.$store.dispatch('user/toggleMark', {markableType: this.type, markableId: this.item.id, type: MarkType.CanDo});
    } catch (e) {
      this.$notify.error(e);
    }
    this.isRequesting = false;
  }

  get isInRepertoire() {
    return this.marks.find(mark => mark.markableId === this.item.id && mark.markableType === this.type && mark.type === MarkType.CanDo);
  }

  get marks() {
    return this.$store.state.user.marks;
  }
}
</script>

<style lang="scss" scoped>
</style>
