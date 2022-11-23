<template>
  <v-container>
    <create-list-dialog v-model="dialog.createList"/>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <breadcrumb-title :title="title" :parents="[{to: {name: 'dictionary'}, text: $t('label.dictionary')}]"/>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
        <tooltip-button v-if="$store.state.auth.isAdmin" :to="{name: 'flow-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.flow')})" small-btn left/>
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
              <div class="d-flex align-center">
                <v-checkbox v-model="filter.enableDifficulty" class="mr-2 mt-0"/>
                <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="6" :hint="difficultyLabel" persistent-hint
                                :disabled="!filter.enableDifficulty"/>
              </div>
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
        <paginated-grid url="/api/flows" :headers="headers" :search-params="searchParams" :options="options">
          <template #item="{item}">
            <grid-item :item="item" type="flow" @create-list="dialog.createList=true"/>
          </template>
        </paginated-grid>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {FlowStatus} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
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
  components: {CreateListDialog, TooltipButton, ItemMenu, PaginatedTable, PaginatedGrid, EmbedAttachment, GridItem, FavButton, BreadcrumbTitle},
})
export default class FlowsPage extends Page {
  flows = [];
  filter = {
    name: null,
    status: FlowStatus.Accepted,
    difficulty: [1, 6],
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
  showFilter = false;
  searchParams = {};

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
    this.searchParams = {
      name: this.filter.name,
      difficulty: this.filter.enableDifficulty === false ? undefined : this.filter.difficulty,
      status: this.filter.status,
    };
    const query = Object.assign(this.searchParams, {sortBy: this.options.sortBy, sortDesc: String(this.options.sortDesc)});
    const isDifferentQuery = Object.keys(query).reduce((result, key) => result || query[key] !== this.$route.query[key], false);

    if (isDifferentQuery) {
      this.$router.replace({query});
    }
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

  get statusOptions() {
    return Object.values(FlowStatus).map(value => ({text: this.$t('status.' + value), value}));
  }
}
</script>

<style lang="scss" scoped>
</style>
