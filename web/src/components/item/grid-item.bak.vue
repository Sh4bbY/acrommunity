<template>
  <div class="grid-item">
    <div class="tile-wrap elevation-1">
      <div class="tile-header">
        <fav-button :item="item" :type="type" small/>
        <div class="flex-grow-1 text-center py-1">
          <router-link :to="{name: type + '-details', params: {id: item.id}}">{{ item.name }}</router-link>
        </div>
        <item-menu :item="item" :type="type" small @create-list="$emit('create-list')"/>
      </div>

      <router-link v-if="type === 'pose'" :to="{name: type + '-details', params: {id: item.id}}">
        <v-img v-if="item.attachments.length > 0" :src="item.attachments[0].url" contain/>
      </router-link>
      <embed-attachment v-else-if="item.attachments.length > 0" :attachment="item.attachments[0]" class="pa-1"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {FavButton, ItemMenu, TooltipButton, EmbedAttachment},
})
export default class GridItem extends Vue {
  @Prop({type: String}) type: string;
  @Prop() item: any;
}
</script>

<style lang="scss" scoped>
.grid-item {
  padding: 6px;

  .tile-wrap {
    margin: 6px;
    border: 1px solid rgba(#777, 0.2);
    border-radius: 4px;
  }

  .tile-header {
    display: flex;
    padding: 2px;
    align-items: center;
    border-bottom: 1px solid rgba(#777, 0.2);
  }
}
</style>
