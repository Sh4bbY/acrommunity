<template>
  <v-container>
    <media-dialog v-model="dialog.show" :item="dialog.item" type="video" :is-first="dialog.isFirst" :is-last="dialog.isLast" @next="loadNextVideo" @prev="loadPrevVideo"/>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $tc('p.video', 2) }}</v-toolbar-title>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})" left
                        @click="showFilter = !showFilter"/>
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" sm="4" md="3">
              <v-select v-model="filter.persons" :label="$tc('p.person',2)" :items="personOptions" hide-details/>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-select v-model="filter.bases" :label="$tc('p.base',2)" :items="basesOptions" hide-details/>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-select v-model="filter.baseType" :label="$t('label.baseType')" :items="baseTypeOptions" hide-details/>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="d-flex align-end">
              <v-spacer/>
              <v-btn color="primary" @click="applyFilter">
                {{ $t('action.apply') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>


      <paginated-grid url="/api/videos" :search-params="searchParams" @update="videos=$event" class="mt-5">
        <template #item="{item}">
          <div class="d-flex justify-center align-center">
            <v-card @click="showDialog(item)" class="thumbnail-card">
              <img :src="item.thumbnail" style="max-height: 150px; max-width: 100%"/>
            </v-card>
          </div>
        </template>
      </paginated-grid>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import MediaDialog from '~/components/media-dialog.vue';
import PaginatedGrid from '~/components/paginated-grid.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import Page from '../page.vue';

@Component({
  components: {PaginatedGrid, TooltipButton, MediaDialog},
})
export default class VideosPage extends Page {
  videos = [];
  favorites = [];
  filter = {
    persons: 2,
    bases: 1,
    baseType: 'l_base',
  };
  dialog = {
    show: false,
    item: null,
    isFirst: false,
    isLast: false,
  };
  showFilter = true;
  searchParams = {};

  get title() {
    return this.$tc('p.video', 2);
  }

  applyFilter() {
    return this.searchParams = {
      persons: this.filter.persons === null ? undefined : this.filter.persons,
      bases: this.filter.bases === null ? undefined : this.filter.bases,
      baseType: this.filter.baseType === null ? undefined : this.filter.baseType,
    };
  }

  showDialog(item) {
    const idx = this.videos.findIndex(v => v.id === item.id);
    this.dialog = {
      show: true,
      item,
      isFirst: idx === 0,
      isLast: idx === this.videos.length - 1,
    };
  }


  loadNextVideo() {
    const idx = this.videos.findIndex(v => v.id === this.dialog.item.id);
    if (idx + 1 < this.videos.length) {
      this.dialog.item = this.videos[idx + 1];
    }
    this.dialog.isFirst = idx - 1 === 0;
    this.dialog.isLast = idx + 1 === this.videos.length - 1;
  }

  loadPrevVideo() {
    const idx = this.videos.findIndex(v => v.id === this.dialog.item.id);
    if (idx - 1 >= 0) {
      this.dialog.item = this.videos[idx - 1];
    }
    this.dialog.isFirst = idx - 1 === 0;
    this.dialog.isLast = idx + 1 === this.videos.length - 1;
  }

  get personOptions() {
    return [
      {text: this.$t('label.any'), value: null},
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '4', value: 4},
      {text: '5', value: 5},
      {text: '6', value: 6},
    ];
  }

  get basesOptions() {
    return [
      {text: this.$t('label.any'), value: null},
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '3', value: 'multiple'},
    ];
  }

  get baseTypeOptions() {
    return [
      {text: this.$t('label.any'), value: null},
      {text: 'L-Base', value: 'l_base'},
      {text: 'Standing', value: 'standing'},
      {text: 'Belly Base', value: 'belly_base'},
      {text: 'On Hands', value: 'on_hands'},
      {text: 'Walking', value: 'walking'},
      {text: 'Moving', value: 'moving'},
      {text: 'Other', value: 'other'},
    ];
  }
}
</script>

<style lang="scss" scoped>
.thumbnail-card {
  width: auto;
  display: inline-block;
  padding-bottom: 0;
  max-height: 150px;
}
</style>
