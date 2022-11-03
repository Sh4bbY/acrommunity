<template>
  <v-card class="mb-5">
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{ $t('label.randomItems', {items: $tc('p.pose', 2)}) }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <vue-horizontal responsive v-if="poses.length > 0">
        <div v-for="(pose,i) in poses" :key="i" class="item-container">
          <header>
            <v-spacer/>
            <router-link :to="{name: 'pose-details', params: {id: pose.id}}">{{ pose.name }}</router-link>
            <v-spacer/>
            <item-menu :item="pose" type="pose" class="item-menu"/>
          </header>
          <v-spacer/>
          <v-img :src="pose.attachments[0].url" max-height="150" contain/>
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

@Component({
  components: {ItemMenu, VueHorizontal},
})
export default class HomePoses extends Vue {
  poses = [];

  async mounted() {
    const response = await this.$api.get('/api/home/poses');
    this.poses = response.data;
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
  position: relative;

  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
  }
}
</style>
