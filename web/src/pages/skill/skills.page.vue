<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $tc('p.skill', 2) }}</v-toolbar-title>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
        <tooltip-button :icon="gridView ? 'mdi-view-list' : 'mdi-view-grid'" :tooltip="gridView ? 'Switch to Table View' : 'Switch to Grid View'" left
                        @click="gridView = !gridView"/>
        <tooltip-button :to="{name: 'skill-create'}" icon="mdi-plus" :tooltip="$t('action.createItem', {item: $tc('p.skill')})" small-btn left/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" md="6" lg="4">
              <v-range-slider v-model="filter.difficulty" :label="$t('field.difficulty')" min="1" max="10" :hint="difficultyLabel" persistent-hint/>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-select v-model="filter.type" :label="$t('field.type')" :items="skillTypes" multiple/>
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

      <paginated-grid v-if="gridView" url="/api/skills" :headers="headers" :search-params="searchParams">
        <template #item="{item}">
          <div class="grid-item">
            <div class="image-wrap">
              <div class="d-flex pa-1">
                <tooltip-button color="red" small
                                :tooltip="isFavorite(item) ? $t('action.removeFromItems', {items: $tc('p.favorite', 2)}) : $t('action.addToItems', {items: $tc('p.favorite', 2)})"
                                :icon="isFavorite(item) ? 'mdi-heart' : 'mdi-heart-outline'"
                                @click="toggleFavorite(item)"
                />
                <v-spacer/>
                <item-menu class="item-menu"/>
              </div>
              <v-img v-if="item.attachments.length > 0" :src="item.attachments[0].url" contain/>
            </div>
            <div class="text">
              <router-link :to="{name: 'skill-details', params: {id: item.id}}">{{ item.name }}</router-link>
            </div>
          </div>
        </template>
      </paginated-grid>

      <paginated-table v-else url="/api/skills" :headers="headers" :search-params="searchParams">
        <template #item.name="{item}">
          <router-link :to="{name: 'skill-details', params: {id: item.id}}">{{ item.name }}</router-link>
        </template>
        <template #item.difficulty="{item}">
          <span>{{ item.difficulty }} ({{ resolveDifficulty(item.difficulty) }})</span>
        </template>
        <template #item.actions="{item}">
          <tooltip-button color="red" small
                          :tooltip="isFavorite(item) ? $t('action.removeFromItems', {items: $tc('p.favorite', 2)}) : $t('action.addToItems', {items: $tc('p.favorite', 2)})"
                          :icon="isFavorite(item) ? 'mdi-heart' : 'mdi-heart-outline'"
                          @click="toggleFavorite(item)"
          />
          <item-menu/>
        </template>
      </paginated-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {SkillType} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import ItemMenu from '~/components/item-menu.vue';
import PaginatedGrid from '~/components/paginated-grid.vue';
import PaginatedTable from '~/components/paginated-table.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {PaginatedTable, PaginatedGrid, TooltipButton, ItemMenu},
})
export default class SkillsPage extends Page {
  skills = [];
  favorites = [];
  filter = {
    difficulty: [1, 5],
  };
  showFilter = false;
  gridView = false;
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

  isFavorite(item) {
    return this.favorites.includes(item.id);
  }

  toggleFavorite(item) {
    if (this.isFavorite(item)) {
      const index = this.favorites.indexOf(item.id);
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(item.id);
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

  get skillTypes() {
    return Object.values(SkillType).map(type => ({text: this.$t('skillType.' + type), value: type}));
  }
}
</script>

<style lang="scss" scoped>
.grid-item {
  padding: 6px;

  .image-wrap {
    margin: 6px;
    border: 1px solid rgba(#777, 0.2);
    border-radius: 4px;
  }

  .text {
    text-align: center;
  }
}

</style>
