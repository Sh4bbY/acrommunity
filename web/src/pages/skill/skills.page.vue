<template>
  <v-container>
    <create-list-dialog v-model="dialog.createList"/>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>
          <breadcrumb-title :title="title" :parents="[{to: {name: 'dictionary'}, text: $t('label.dictionary')}]"/>
        </v-toolbar-title>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
        <tooltip-button :to="{name: 'skill-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.skill')})" small-btn left/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-text-field v-model="filter.name" :label="$t('field.name')" clearable @keyup.enter="applyFilter"/>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-select v-model="filter.type" :label="$t('field.type')" :items="skillTypes" multiple clearable/>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="d-flex align-center">
                <v-checkbox v-model="filter.enableDifficulty" class="mr-2 mt-0" hide-details/>
                <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="6" :hint="difficultyLabel" persistent-hint
                                :disabled="!filter.enableDifficulty" class="mt-4"/>
              </div>
            </v-col>
            <!--            <v-col cols="12" sm="6" md="4">-->
            <!--              <v-select v-model="filter.persons" :label="$t('field.persons')" :items="personOptions" clearable/>-->
            <!--            </v-col>-->
            <v-col cols="12" sm="6" md="4">
              <v-select v-model="filter.status" :label="$t('field.status')" :items="statusOptions" clearable/>
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
        <paginated-grid url="/api/skills" :headers="headers" :search-params="searchParams" :options="options">
          <template #item="{item}">
            <grid-item :item="item" :type="type" @create-list="dialog.createList=true"/>
          </template>
        </paginated-grid>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {PoseStatus, SkillType} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import GridItem from '~/components/item/grid-item.vue';
import CreateListDialog from '~/components/my/create-list-dialog.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {PaginatedGrid, TooltipButton, GridItem, CreateListDialog, BreadcrumbTitle},
})
export default class SkillsPage extends Page {
  skills = [];
  filter = {
    name: null,
    persons: 2,
    status: PoseStatus.Accepted,
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

  get title() {
    return this.$tc('p.skill', 2);
  }

  get headers() {
    return [
      {text: this.$t('field.name'), value: 'name'},
      {text: this.$t('field.difficulty'), value: 'difficulty'},
      {text: this.$t('field.type'), value: 'type'},
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

  get skillTypes() {
    return Object.values(SkillType).map(type => ({text: this.$t('skillType.' + type), value: type}));
  }

  get statusOptions() {
    return Object.values(PoseStatus).map(value => ({text: this.$t('status.' + value), value}));
  }

  get type() {
    return 'skill';
  }
}
</script>

<style lang="scss" scoped>
</style>
