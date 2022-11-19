<template>
  <v-container>
    <media-dialog v-model="dialog.show" :item="dialog.item" type="image" :fullscreen="$vuetify.breakpoint.xs" :is-first="dialog.isFirst" :is-last="dialog.isLast" @next="loadNext"
                  @prev="loadPrev"/>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>
          <breadcrumb-title :title="title" :parents="[{to: {name: 'dictionary'}, text: $t('label.dictionary')}]"/>
        </v-toolbar-title>
        <v-spacer/>
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'" left :top="false"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})"
                        @click="showFilter = !showFilter"
        />
      </v-toolbar>

      <v-expand-transition>
        <v-sheet v-show="showFilter" color="primary lighten-5 pa-3">
          <v-row>
            <v-col cols="12" sm="4">
              <v-select v-model="filter.persons" :label="$tc('p.person',2)" :items="personOptions"/>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="filter.bases" :label="$tc('p.base',2)" :items="basesOptions"/>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="filter.baseType" :label="$t('label.baseType')" :items="baseTypeOptions"/>
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

      <paginated-grid url="/api/images" :options="options" :search-params="searchParams" @update="images=$event">
        <template #items="{items}">
          <v-row no-gutters>
            <v-col v-for="item in items" :key="item.url" cols="6" sm="4" md="3" lg="2">
              <v-card @click="showDialog(item)" tile>
                <v-img :src="item.thumbnail" width="100%" height="200px"/>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </paginated-grid>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import MediaDialog from '~/components/dialogs/media-dialog.vue';
import Page from '../page.vue';

@Component({
  components: {MediaDialog, PaginatedGrid, TooltipButton, BreadcrumbTitle},
})
export default class ImagesMobilePage extends Page {
  images = [];
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
  showFilter = false;
  options = {itemsPerPage: 24};
  searchParams = {};

  get title() {
    return this.$tc('p.image', 2);
  }

  applyFilter() {
    return this.searchParams = {
      persons: this.filter.persons === null ? undefined : this.filter.persons,
      bases: this.filter.bases === null ? undefined : this.filter.bases,
      baseType: this.filter.baseType === null ? undefined : this.filter.baseType,
    };
  }

  showDialog(item) {
    const idx = this.images.findIndex(v => v.id === item.id);
    this.dialog = {
      show: true,
      item,
      isFirst: idx === 0,
      isLast: idx === this.images.length - 1,
    };
  }

  loadNext() {
    const idx = this.images.findIndex(v => v.id === this.dialog.item.id);
    if (idx + 1 < this.images.length) {
      this.dialog.item = this.images[idx + 1];
    }
    this.dialog.isFirst = false;
    this.dialog.isLast = idx + 1 === this.images.length - 1;
  }

  loadPrev() {
    const idx = this.images.findIndex(v => v.id === this.dialog.item.id);
    if (idx - 1 >= 0) {
      this.dialog.item = this.images[idx - 1];
    }
    this.dialog.isFirst = idx - 1 === 0;
    this.dialog.isLast = false;
  }


  get personOptions() {
    return [
      {text: 'Any', value: null},
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
      {text: 'Any', value: null},
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '4 oder mehr', value: 'multiple'},
    ];
  }

  get baseTypeOptions() {
    return [
      {text: 'Any', value: null},
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
</style>
