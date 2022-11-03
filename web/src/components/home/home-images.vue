<template>
  <v-card class="mb-5">
    <media-dialog v-model="dialog.show" :item="dialog.item" type="image"/>

    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{ $t('label.randomItems', {items: $tc('p.image', 2)}) }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <vue-horizontal responsive v-if="images.length > 0">
        <div v-for="(item,i) in images" :key="i" class="item-container" @click="dialog={show: true, item: item}">
          <v-img :src="item.thumbnail" max-height="150" contain/>
        </div>
      </vue-horizontal>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import VueHorizontal from 'vue-horizontal';
import {Component} from 'vue-property-decorator';
import ItemMenu from '~/components/item/item-menu.vue';
import MediaDialog from '~/components/media-dialog.vue';

@Component({
  components: {ItemMenu, VueHorizontal, MediaDialog},
})
export default class HomeImages extends Vue {
  images = [];
  dialog = {
    show: false,
    item: null,
  };

  async mounted() {
    const response = await this.$api.get('/api/home/images');
    this.images = response.data;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .item-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(#777, 0.2);
  margin-right: 8px;
  border-radius: 3px;
  width: 150px;
  cursor: pointer;
  position: relative;
}
</style>
