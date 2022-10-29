<template>
  <v-container>
    <create-list-dialog v-model="dialog.createList"/>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $tc('p.pose', 2) }}</v-toolbar-title>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
        <tooltip-button :icon="gridView ? 'mdi-view-list' : 'mdi-view-grid'" :tooltip="gridView ? 'Switch to Table View' : 'Switch to Grid View'" left
                        @click="gridView = !gridView"/>
        <tooltip-button :to="{name: 'pose-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.pose')})" small-btn left/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" md="6" lg="4">
              <v-select v-model="filter.basePositions" :label="$t('field.basePosition')" :items="basePositions" multiple/>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-select v-model="filter.flyerPositions" :label="$t('field.flyerPosition')" :items="flyerPositions" multiple/>
            </v-col>
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

      <paginated-grid v-if="gridView" url="/api/poses" :headers="headers" :search-params="searchParams">
        <template #item="{item}">
          <grid-item :item="item" :type="type" @create-list="dialog.createList=true"/>
        </template>
      </paginated-grid>

      <paginated-table v-else url="/api/poses" :headers="headers" :search-params="searchParams">
        <template #item.name="{item}">
          <router-link :to="{name: 'pose-details', params: {id: item.id}}">{{ item.name }}</router-link>
        </template>
        <template #item.image="{item}">
          <v-img v-if="item.attachments.length > 0" :src="item.attachments[0].url" max-width="100" max-height="100" contain/>
        </template>
        <template #item.difficulty="{item}">
          <span>{{ item.difficulty }} ({{ resolveDifficulty(item.difficulty) }})</span>
        </template>
        <template #item.actions="{item}">
          <fav-button :item="item" :type="type"/>
          <item-menu :item="item" :type="type" @create-list="dialog.createList=true"/>
        </template>
      </paginated-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import FavButton from '~/components/item/fav-button.vue';
import GridItem from '~/components/item/grid-item.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import CreateListDialog from '~/components/my-lists/create-list-dialog.vue';
import PaginatedGrid from '~/components/paginated-grid.vue';
import PaginatedTable from '~/components/paginated-table.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {PaginatedTable, PaginatedGrid, TooltipButton, ItemMenu, GridItem, FavButton, CreateListDialog},
})
export default class PosesPage extends Page {
  poses = [];
  favorites = [];
  filter = {
    difficulty: [1, 5],
  };
  dialog = {
    createList: false,
  };
  showFilter = false;
  gridView = true;
  searchParams = {};

  get title() {
    return this.$tc('p.pose', 2);
  }

  get headers() {
    return [
      {text: this.$tc('p.image'), value: 'image', sortable: false},
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

  get basePositions() {
    return Object.values(BasePosition).map(value => ({text: this.$t('basePosition.' + value), value}));
  }

  get flyerPositions() {
    return Object.values(FlyerPosition).map(value => ({text: this.$t('flyerPosition.' + value), value}));
  }

  get difficultyLabel() {
    if (Array.isArray(this.filter.difficulty)) {
      return `${this.$t('label.from')} ${resolveDifficulty(this.filter.difficulty[0], this)} ${this.$t('label.to')} ${resolveDifficulty(this.filter.difficulty[1], this)} `;
    }
    return '-';
  }

  get type() {
    return 'pose';
  }
}
</script>

<style lang="scss" scoped>
</style>
