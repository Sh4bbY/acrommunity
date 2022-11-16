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
        <tooltip-button :to="{name: 'pose-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.pose')})" small-btn left/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field v-model="filter.name" :label="$t('field.name')" clearable @keyup.enter="applyFilter"/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.status" :label="$t('field.status')" :items="statusOptions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.persons" :label="$tc('p.person', 2)" :items="personOptions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <div class="d-flex align-center">
                <v-checkbox v-model="filter.enableDifficulty" class="mr-2 mt-0"/>
                <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="10" :hint="difficultyLabel" persistent-hint
                                :disabled="!filter.enableDifficulty"/>
              </div>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.basePosition" :label="$t('field.basePosition')" :items="basePositions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.flyerPosition" :label="$t('field.flyerPosition')" :items="flyerPositions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="options.sortBy[0]" :label="$t('action.sortBy')" :items="sortByOptions"/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="options.sortDesc[0]" :label="$t('label.direction')" :items="directionOptions"/>
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

      <paginated-grid url="/api/poses" :headers="headers" :search-params="searchParams" :options="options">
        <template #item="{item}">
          <grid-item :item="item" :type="type" @create-list="dialog.createList=true"/>
        </template>
      </paginated-grid>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition, Status} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import FavButton from '~/components/item/fav-button.vue';
import GridItem from '~/components/item/grid-item.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import CreateListDialog from '~/components/my/create-list-dialog.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import PaginatedTable from '~/components/common/paginated-table.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {PaginatedTable, PaginatedGrid, TooltipButton, ItemMenu, GridItem, FavButton, CreateListDialog},
})
export default class PosesPage extends Page {
  poses = [];
  favorites = [];
  filter = {
    name: null,
    persons: 2,
    status: Status.Suggestion,
    difficulty: [1, 6],
    basePosition: null,
    flyerPosition: null,
    enableDifficulty: false,
  };
  options = {
    sortBy: ['id'],
    sortDesc: [false],
    itemsPerPage: 12,
  };
  dialog = {
    createList: false,
  };
  showFilter = true;
  searchParams = {};

  get title() {
    return this.$tc('p.pose', 2);
  }

  get headers() {
    return [
      {text: this.$tc('field.id'), value: 'id'},
      {text: this.$tc('p.image'), value: 'image', sortable: false},
      {text: this.$t('field.name'), value: 'name'},
      {text: this.$t('field.difficulty'), value: 'difficulty'},
      {text: this.$tc('p.action', 2), value: 'actions', sortable: false, align: 'right'},
    ];
  }

  beforeMount() {
    this.searchParams = Object.assign(this.searchParams, this.$route.query);
    Object.keys(this.filter).map(key => this.filter[key] = this.$route.query[key] || this.filter[key]);
    Object.keys(this.options).map(key => this.options[key] = this.$route.query[key] || this.options[key]);
    if (this.$route.query.sortBy) {
      this.options.sortBy = Array.isArray(this.$route.query.sortBy) ? this.$route.query.sortBy : [this.$route.query.sortBy];
    }
    if (this.$route.query.sortDesc) {
      this.options.sortDesc = Array.isArray(this.$route.query.sortDesc) ? [this.$route.query.sortDesc[0] === 'true'] : [this.$route.query.sortDesc === 'true'];
    }
  }

  applyFilter() {
    this.searchParams = {
      name: this.filter.name,
      persons: this.filter.persons,
      difficulty: this.filter.enableDifficulty === false ? undefined : this.filter.difficulty,
      basePosition: this.filter.basePosition,
      flyerPosition: this.filter.flyerPosition,
      status: this.filter.status,
    };
    const query = Object.assign(this.searchParams, {sortBy: this.options.sortBy, sortDesc: String(this.options.sortDesc)});
    const isDifferentQuery = Object.keys(query).reduce((result, key) => {
      if (key === 'sortBy') {
        return result || this.$route.query[key] === query[key][0];
      }
      if (key === 'sortDesc') {
        return result || this.$route.query[key] === String(query[key][0]);
      }
      return result || query[key] !== this.$route.query[key];
    }, false);

    if (isDifferentQuery) {
      this.$router.replace({query});
    }
  }

  resolveDifficulty(difficulty) {
    return resolveDifficulty(difficulty, this);
  }

  get basePositions() {
    return [{text: this.$t('label.any'), value: null}].concat(Object.values(BasePosition).map(value => ({text: this.$t('basePosition.' + value), value})));
  }

  get flyerPositions() {
    return [{text: this.$t('label.any'), value: null}].concat(Object.values(FlyerPosition).map(value => ({text: this.$t('flyerPosition.' + value), value})));
  }

  get statusOptions() {
    return Object.values(Status).map(value => ({text: this.$t('status.' + value), value}));
  }

  get personOptions() {
    return [2, 3, 4];
  }

  get sortByOptions() {
    return ['id', 'name', 'difficulty', 'persons', 'basePosition', 'flyerPosition']
        .map(field => ({text: this.$t('field.' + field), value: field}));
  }

  get directionOptions() {
    return [
      {text: this.$t('direction.desc'), value: true},
      {text: this.$t('direction.asc'), value: false},
    ];
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
