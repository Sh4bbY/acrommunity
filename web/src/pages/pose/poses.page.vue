<template>
  <v-container>
    <create-list-dialog v-model="dialog.createList"/>
    <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'poses'" :to="{name: 'poses'}" rounded>{{ $t('label.all') }}</v-btn>
    <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'pose-favorites'" :to="{name: 'pose-favorites'}" rounded>
      <v-icon left small>mdi-heart</v-icon>
      {{ $tc('p.favorite', 2) }}
    </v-btn>
    <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'pose-repertoire'" :to="{name: 'pose-repertoire'}" rounded>
      <v-icon left small>mdi-arm-flex</v-icon>
      {{ $tc('label.repertoire') }}
    </v-btn>
    <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'pose-training-plan'" :to="{name: 'pose-training-plan'}" rounded>
      <v-icon left small>mdi-wrench</v-icon>
      {{ $tc('label.trainingPlan') }}
    </v-btn>

    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>
          <breadcrumb-title :title="breadcrumbTitle" :parents="parents"/>
        </v-toolbar-title>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
        <tooltip-button v-if="$store.state.auth.isAdmin" :to="{name: 'pose-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.pose')})" small-btn left/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field v-model="filter.name" :label="$t('field.name')" clearable @keyup.enter="applyFilter"/>
            </v-col>
            <v-col v-if="$store.state.auth.isAdmin" cols="12" sm="6" lg="4">
              <v-select v-model="filter.status" :label="$t('field.status')" :items="statusOptions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.persons" :label="$tc('p.person', 2)" :items="personOptions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <div class="d-flex align-center">
                <v-checkbox v-model="filter.enableDifficulty" class="mr-2 mt-0"/>
                <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="6" :hint="difficultyLabel" persistent-hint
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
              <v-select v-model="filter.favorites" :label="$tc('p.favorite', 2)" :items="markOptions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.workingOn" :label="$t('label.trainingPlan')" :items="markOptions" clearable/>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.repertoire" :label="$t('label.repertoire')" :items="markOptions" clearable/>
            </v-col>
            <v-col v-if="$store.state.auth.isAdmin" cols="12" sm="6" lg="4">
              <v-select v-model="options.sortBy[0]" :label="$t('action.sortBy')" :items="sortByOptions"/>
            </v-col>
            <v-col v-if="$store.state.auth.isAdmin" cols="12" sm="6" lg="4">
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

      <v-card-text>
        <paginated-grid :url="url" :headers="headers" :search-params="searchParams" :options="options">
          <template #item="{item}">
            <grid-item :item="item" :type="type" @create-list="dialog.createList=true"/>
          </template>
        </paginated-grid>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition, PoseStatus} from '@acrommunity/common';
import {Component, Watch} from 'vue-property-decorator';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import PaginatedTable from '~/components/common/paginated-table.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import GridItem from '~/components/item/grid-item.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import CreateListDialog from '~/components/my/create-list-dialog.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {PaginatedTable, PaginatedGrid, TooltipButton, ItemMenu, GridItem, FavButton, CreateListDialog, BreadcrumbTitle},
})
export default class PosesPage extends Page {
  poses = [];
  filter = {
    name: null,
    persons: 2,
    status: PoseStatus.Accepted,
    difficulty: [1, 6],
    basePosition: null,
    flyerPosition: null,
    enableDifficulty: false,
    favorites: null,
    workingOn: null,
    repertoire: null,
  };
  options = {
    sortBy: ['id'],
    sortDesc: [false],
    itemsPerPage: 12,
  };
  dialog = {
    createList: false,
  };
  showFilter = false;
  searchParams: any = {};

  get title() {
    return this.$tc('p.pose', 2);
  }

  get breadcrumbTitle() {
    switch (this.$route.name) {
      case 'pose-favorites':
        return this.$tc('p.favorite', 2);
      case 'pose-repertoire':
        return this.$t('label.repertoire');
      case 'pose-training-plan':
        return this.$t('label.trainingPlan');
      default:
        return this.title;
    }
  }

  get parents() {
    const items = [
      {to: {name: 'dictionary'}, text: this.$t('label.dictionary')},
    ];
    if (this.$route.name !== 'poses') {
      items.push({to: {name: 'poses'}, text: this.$tc('p.pose', 2)});
    }
    return items;
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
    this.searchParams = this.routeSearchParams;
  }

  @Watch('$route')
  watchRoute() {
    this.searchParams = this.routeSearchParams;
  }

  get routeSearchParams() {
    return {
      favorites: this.$route.name === 'pose-favorites' ? true : undefined,
      repertoire: this.$route.name === 'pose-repertoire' ? true : undefined,
      workingOn: this.$route.name === 'pose-training-plan' ? true : undefined,
    };
  }

  applyFilter() {
    this.searchParams = {
      ...this.filter,
      ...this.routeSearchParams,
      difficulty: this.filter.enableDifficulty === false ? undefined : this.filter.difficulty,
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
    return Object.values(PoseStatus).map(value => ({text: this.$t('status.' + value), value}));
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

  get markOptions() {
    return [
      {text: this.$t('label.include'), value: true},
      {text: this.$t('label.exclude'), value: false},
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

  get url() {
    return this.$store.state.auth.isSignedIn ? '/api/authenticated/poses' : '/api/poses';
  }
}
</script>

<style lang="scss" scoped>
</style>
