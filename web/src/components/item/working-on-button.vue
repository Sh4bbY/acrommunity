<template>
  <tooltip-button color="gray" :small="small" :disabled="isRequesting"
                  :tooltip="isInTrainingPlan ? $t('action.removeFromItems', {items: $t('label.trainingPlan')}) : $t('action.addToItems', {items: $t('label.trainingPlan')})"
                  :icon="isInTrainingPlan ? 'mdi-wrench' : 'mdi-wrench-outline'" @click="toggleMark"/>
</template>

<script lang="ts">
import {MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {TooltipButton},
})
export default class WorkingOnButton extends Vue {
  @Prop({type: String, required: true}) type: string;
  @Prop({type: Object, required: true}) item: any;
  @Prop({type: Boolean, default: false}) small: any;

  isRequesting = false;

  async toggleMark() {
    try {
      this.isRequesting = true;
      await this.$store.dispatch('user/toggleMark', {markableType: this.type, markableId: this.item.id, type: MarkType.WorkingOn});
    } catch (e) {
      this.$notify.error(e);
    }
    this.isRequesting = false;
  }

  get isInTrainingPlan() {
    return this.marks.find(mark => mark.markableId === this.item.id && mark.markableType === this.type && mark.type === MarkType.WorkingOn);
  }

  get marks() {
    return this.$store.state.user.marks;
  }
}
</script>

<style lang="scss" scoped>
</style>
