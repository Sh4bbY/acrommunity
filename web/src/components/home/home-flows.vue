<template>
  <v-card class="mb-5">
    <v-toolbar color="primary" dense dark>
      <v-toolbar-title>{{ $t('label.randomItems', {items: $tc('p.flow', 2)}) }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <vue-horizontal v-if="flows.length > 0" responsive>
        <div v-for="(flow, i) in flows" :key="'flow-' + i" class="item-container">
          <header>
            <v-spacer/>
            <router-link :to="{name: 'flow-details', params: {id: flow.id}}">{{ flow.name }}</router-link>
            <v-spacer/>
            <item-menu :item="flow" type="flow"/>
          </header>
          <embed-attachment :attachment="flow.attachments[0]" max-height="100%" max-width="100%" type="flow"/>
        </div>
      </vue-horizontal>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import VueHorizontal from 'vue-horizontal';
import {Component} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import ItemMenu from '~/components/item/item-menu.vue';

@Component({
  components: {VueHorizontal, EmbedAttachment, ItemMenu},
})
export default class HomeFlows extends Vue {
  flows = [];

  async mounted() {
    const response = await this.$api.get('/api/home/flows');
    this.flows = response.data;
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

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
  }
}
</style>
