<template>
  <v-container>
    <create-list-dialog v-model="dialog.createList"/>
    <div v-if="$store.state.auth.isSignedIn">
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'skills'" :to="{name: 'skills'}" rounded>{{ $t('label.all') }}</v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'skill-favorites'" :to="{name: 'skill-favorites'}" rounded>
        <v-icon left small>mdi-heart</v-icon>
        {{ $tc('p.favorite', 2) }}
      </v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'skill-repertoire'" :to="{name: 'skill-repertoire'}" rounded>
        <v-icon left small>mdi-arm-flex</v-icon>
        {{ $tc('label.repertoire') }}
      </v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'skill-training-plan'" :to="{name: 'skill-training-plan'}" rounded>
        <v-icon left small>mdi-wrench</v-icon>
        {{ $tc('label.trainingPlan') }}
      </v-btn>
    </div>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>
          <breadcrumb-title :title="breadcrumbTitle" :parents="parents"/>
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
            <v-col cols="12" sm="6" lg="4">
              <v-select v-model="filter.type" :label="$t('field.type')" :items="skillTypes" multiple clearable/>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="d-flex align-center">
                <v-checkbox v-model="filter.enableDifficulty" class="mr-2 mt-0" hide-details/>
                <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="6" :hint="difficultyLabel" persistent-hint
                                :disabled="!filter.enableDifficulty" class="mt-4"/>
              </div>
            </v-col>
            <v-col v-if="$store.state.auth.isAdmin" cols="12" sm="6" md="4">
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
import {PoseStatus, SkillType} from '@acrommunity/common';
import {Component, Watch} from 'vue-property-decorator';
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
      favorites: this.$route.name === 'skill-favorites' ? true : undefined,
      repertoire: this.$route.name === 'skill-repertoire' ? true : undefined,
      workingOn: this.$route.name === 'skill-training-plan' ? true : undefined,
    };
  }


  get breadcrumbTitle() {
    switch (this.$route.name) {
      case 'skill-favorites':
        return this.$tc('p.favorite', 2);
      case 'skill-repertoire':
        return this.$t('label.repertoire');
      case 'skill-training-plan':
        return this.$t('label.trainingPlan');
      default:
        return this.title;
    }
  }

  get parents() {
    const items = [
      {to: {name: 'dictionary'}, text: this.$t('label.dictionary')},
    ];
    if (this.$route.name !== 'skills') {
      items.push({to: {name: 'skills'}, text: this.$tc('p.skill', 2)});
    }
    return items;
  }


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
    return this.searchParams = Object.assign({}, this.routeSearchParams, this.filter);
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

  get url() {
    return this.$store.state.auth.isSignedIn ? '/api/authenticated/skills' : '/api/skills';
  }
}
</script>

<style lang="scss" scoped>
</style>
