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
              <div v-if="item.attachments.length > 0 && item.attachments[0].type === 'youtube'">
                <iframe width="100%" height="200px" :src="item.attachments[0].url" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
            <div class="text">
              <router-link :to="{name: 'flow-details', params: {id: item.id}}">{{ item.name }}</router-link>
            </div>
          </div>
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
import {Component} from 'vue-property-decorator';
import ItemMenu from '~/components/item-menu.vue';
import PaginatedGrid from '~/components/paginated-grid.vue';
import PaginatedTable from '~/components/paginated-table.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {TooltipButton, ItemMenu, PaginatedTable, PaginatedGrid},
})
export default class FlowsPage extends Page {
  flows = [];
  favorites = [];
  filter = {
    difficulty: [1, 5],
  };
  showFilter = false;
  gridView = false;
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
