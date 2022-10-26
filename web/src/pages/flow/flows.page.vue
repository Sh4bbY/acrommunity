<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer/>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
        <tooltip-button :icon="gridView ? 'mdi-view-list' : 'mdi-view-grid'" :tooltip="gridView ? 'Switch to Table View' : 'Switch to Grid View'" left
                        @click="gridView = !gridView"/>
        <tooltip-button :to="{name: 'flow-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.flow')})" small-btn left/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" md="6" lg="4">
              <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="10" :hint="difficultyLabel" persistent-hint/>
            </v-col>
          </v-row>
          <div class="d-flex">
            <v-spacer/>
            <v-btn color="primary" @click="applyFilter">
              {{ $t('action.apply') }}
            </v-btn>
          </div>
        </v-sheet>
      </v-expand-transition>

      <paginated-grid v-if="gridView" url="/api/flows" :headers="headers" :search-params="searchParams">
        <template #item="{item}">
          <grid-item :item="item" :type="type"/>
        </template>
      </paginated-grid>

      <paginated-table v-else url="/api/flows" :headers="headers" :search-params="searchParams">
        <template #item.name="{item}">
          <router-link :to="{name: 'flow-details', params: {id: item.id}}">{{ item.name }}</router-link>
        </template>
        <template #item.image="{item}">
          <v-img v-if="item.attachments.length > 0" :src="item.attachments[0].url" max-width="100" max-height="100" contain/>
        </template>
        <template #item.difficulty="{item}">
          <span>{{ item.difficulty }} ({{ resolveDifficulty(item.difficulty) }})</span>
        </template>
        <template #item.actions="{item}">
          <fav-button :item="item" :type="type"/>
          <item-menu :item="item" :type="type"/>
        </template>
      </paginated-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import FavButton from '~/components/item/fav-button.vue';
import GridItem from '~/components/item/grid-item.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import PaginatedGrid from '~/components/paginated-grid.vue';
import PaginatedTable from '~/components/paginated-table.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {TooltipButton, ItemMenu, PaginatedTable, PaginatedGrid, EmbedAttachment, GridItem, FavButton},
})
export default class FlowsPage extends Page {
  flows = [];
  filter = {
    difficulty: [1, 5],
  };
  showFilter = false;
  gridView = true;
  searchParams = {};

  get title() {
    return this.$tc('p.flow', 2);
  }

  get headers() {
    return [
      {text: this.$t('field.name'), value: 'name'},
      {text: this.$t('field.difficulty'), value: 'difficulty'},
      {text: this.$tc('p.action', 2), value: 'actions', sortable: false, align: 'right'},
    ];
  }

  applyFilter() {
    return this.searchParams = Object.assign({}, this.filter);
  }

  resolveDifficulty(difficulty) {
    return resolveDifficulty(difficulty, this);
  }

  get difficultyLabel() {
    if (Array.isArray(this.filter.difficulty)) {
      return `${this.$t('label.from')} ${resolveDifficulty(this.filter.difficulty[0], this)} ${this.$t('label.to')} ${resolveDifficulty(this.filter.difficulty[1], this)} `;
    }
    return '-';
  }

  get type() {
    return 'flow';
  }
}
</script>

<style lang="scss" scoped>
</style>
