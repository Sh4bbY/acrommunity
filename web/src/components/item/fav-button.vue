<template>
  <tooltip-button color="red" :small="small" :disabled="isRequesting"
                  :tooltip="isFavorite ? $t('action.removeFromItems', {items: $tc('p.favorite', 2)}) : $t('action.addToItems', {items: $tc('p.favorite', 2)})"
                  :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" @click="toggleFavorite"/>
</template>

<script lang="ts">
import {MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {TooltipButton},
})
export default class FavButton extends Vue {
  @Prop({type: String, required: true}) type: string;
  @Prop({type: Object, required: true}) item: any;
  @Prop({type: Boolean, default: false}) small: any;

  isRequesting = false;

  async toggleFavorite() {
    try {
      this.isRequesting = true;
      await this.$store.dispatch('user/toggleMark', {markableType: this.type, markableId: this.item.id, type: MarkType.Favorite});
    } catch (e) {
      this.$notify.error(e);
    }
    this.isRequesting = false;
  }

  get isFavorite() {
    return this.marks.find(mark => mark.markableId === this.item.id && mark.markableType === this.type && mark.type === MarkType.Favorite);
  }

  get marks() {
    return this.$store.state.user.marks;
  }
}
</script>

<style lang="scss" scoped>
</style>
