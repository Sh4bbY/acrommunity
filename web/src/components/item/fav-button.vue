<template>
  <tooltip-button color="red" :small="small"
                  :tooltip="isFavorite ? $t('action.removeFromItems', {items: $tc('p.favorite', 2)}) : $t('action.addToItems', {items: $tc('p.favorite', 2)})"
                  :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" @click="toggleFavorite"/>
</template>

<script lang="ts">
import {MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import TooltipButton from '~/components/tooltip-button.vue';

@Component({
  components: {TooltipButton},
})
export default class FavButton extends Vue {
  @Prop({type: String}) type: string;
  @Prop({type: Object, required: true}) item: any;
  @Prop({type: Boolean, default: false}) small: any;

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.removeFromFavorites();
    } else {
      await this.markAsFavorite();
    }
  }

  async markAsFavorite() {
    try {
      await this.$store.dispatch('user/markAsFavorite', {markableType: this.type, markableId: this.item.id});
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeFromFavorites() {
    try {
      await this.$store.dispatch('user/removeFromFavorites', {markableType: this.type, markableId: this.item.id});
    } catch (e) {
      this.$notify.error(e);
    }
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
