<template>
  <v-card tile>
    <div class="tile-header">
      <div class="flex-grow-1 text-center pt-1">
        <router-link :to="{name: type + '-details', params: {id: item.id}}">{{ item.name }}</router-link>
      </div>
    </div>
    <router-link v-if="type === 'pose'" :to="{name: type + '-details', params: {id: item.id}}">
      <v-img v-if="item.attachments.length > 0" :src="getAttachment(item.attachments).url" contain/>
    </router-link>
    <embed-attachment v-else-if="item.attachments.length > 0" :attachment="getAttachment(item.attachments)"/>
    <div v-if="$store.state.auth.isSignedIn" class="tile-footer">
      <fav-button :item="item" :type="type" small/>
      <working-on-button :item="item" :type="type" small/>
      <repertoire-button :item="item" :type="type" small/>
      <item-menu v-if="$store.state.auth.isSignedIn" :item="item" :type="type" small @create-list="$emit('create-list')"/>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import RepertoireButton from '~/components/item/repertoire-button.vue';
import WorkingOnButton from '~/components/item/working-on-button.vue';

@Component({
  components: {WorkingOnButton, RepertoireButton, FavButton, ItemMenu, TooltipButton, EmbedAttachment},
})
export default class GridItem extends Vue {
  @Prop({type: String}) type: string;
  @Prop() item: any;

  getAttachment(attachments: any[]) {
    return attachments.slice().sort((a, b) => a.id < b.id ? -1 : 1)[0];
  }
}
</script>

<style lang="scss" scoped>
.tile-header {
  display: flex;
  padding: 2px;
  align-items: center;
  border-bottom: 1px solid rgba(#777, 0.2);
}

.tile-footer {
  display: flex;
  padding: 2px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(#777, 0.2);
}
</style>
