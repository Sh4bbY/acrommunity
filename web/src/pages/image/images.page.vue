<template>
  <v-container>
    <media-dialog v-model="dialog.show" :item="dialog.item" type="image" :fullscreen="$vuetify.breakpoint.xs" :is-first="dialog.isFirst" :is-last="dialog.isLast" @next="loadNext"
                  @prev="loadPrev"/>
    <div v-if="$store.state.auth.isSignedIn">
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'images'" :to="{name: 'images'}" rounded>{{ $t('label.all') }}</v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'image-favorites'" :to="{name: 'image-favorites'}" rounded>
        <v-icon left small>mdi-heart</v-icon>
        {{ $tc('p.favorite', 2) }}
      </v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'image-repertoire'" :to="{name: 'image-repertoire'}" rounded>
        <v-icon left small>mdi-arm-flex</v-icon>
        {{ $tc('label.repertoire') }}
      </v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'image-training-plan'" :to="{name: 'image-training-plan'}" rounded>
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
        <tooltip-button :icon="showFilter ? 'mdi-filter' : 'mdi-filter-outline'" left :top="false"
                        :tooltip="showFilter ? $t('action.hideItem', {item: $tc('p.filter',2)}) : $t('action.showItem', {item: $tc('p.filter',2)})"
                        @click="showFilter = !showFilter"
        />
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
            <v-col cols="12" sm="12" md="3" class="d-flex align-center justify-end">
              <v-spacer/>
              <v-btn color="primary" @click="applyFilter">
                {{ $t('action.apply') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>

      <paginated-grid :url="url" :options="options" :search-params="searchParams" @update="images=$event">
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
import {BaseType} from '@acrommunity/common';
import {Component, Watch} from 'vue-property-decorator';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import PaginatedGrid from '~/components/common/paginated-grid.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import MediaDialog from '~/components/dialogs/media-dialog.vue';
import Page from '../page.vue';

@Component({
  components: {MediaDialog, PaginatedGrid, TooltipButton, BreadcrumbTitle},
})
export default class ImagesPage extends Page {
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
  showFilter = true;
  options = {
    itemsPerPage: 48,
    sortBy: ['id'],
    sortDesc: [false],
  };
  searchParams: any = {
    persons: 2,
    bases: 1,
    baseType: 'l_base',
  };

  beforeMount() {
    this.filter.persons = this.$store.state.filter.images.persons;
    this.filter.bases = this.$store.state.filter.images.bases;
    this.filter.baseType = this.$store.state.filter.images.baseType;

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

  @Watch('$route.hash')
  watchRouteHash() {
    if (!this.$route.hash) {
      this.dialog.show = false;
    } else {
      this.showDialogById(this.$route.hash.substring(1));
    }
    // this.searchParams = this.routeSearchParams;
  }

  get routeSearchParams() {
    return {
      ...this.filter,
      favorites: this.$route.name === 'image-favorites' ? true : undefined,
      repertoire: this.$route.name === 'image-repertoire' ? true : undefined,
      workingOn: this.$route.name === 'image-training-plan' ? true : undefined,
    };
  }

  get breadcrumbTitle() {
    switch (this.$route.name) {
      case 'image-favorites':
        return this.$tc('p.favorite', 2);
      case 'image-repertoire':
        return this.$t('label.repertoire');
      case 'image-training-plan':
        return this.$t('label.trainingPlan');
      default:
        return this.title;
    }
  }

  get parents() {
    const items = [
      {to: {name: 'dictionary'}, text: this.$t('label.dictionary')},
    ];
    if (this.$route.name !== 'images') {
      items.push({to: {name: 'images'}, text: this.$tc('p.image', 2)});
    }
    return items;
  }


  get title() {
    return this.$tc('p.image', 2);
  }

  applyFilter() {
    this.searchParams = {
      ...this.routeSearchParams,
      persons: this.filter.persons === null ? undefined : this.filter.persons,
      bases: this.filter.bases === null ? undefined : this.filter.bases,
      baseType: this.filter.baseType === null ? undefined : this.filter.baseType,
    };
    this.$store.commit('filter/updateImagesFilter', this.filter);
  }

  showDialog(item) {
    const idx = this.images.findIndex(v => v.id === item.id);
    window.location.hash = item.id;
    this.dialog = {
      show: true,
      item,
      isFirst: idx === 0,
      isLast: idx === this.images.length - 1,
    };
  }

  showDialogById(id: string) {
    const idx = this.images.findIndex(v => v.id === Number(id));
    window.location.hash = id;
    this.dialog = {
      show: true,
      item: this.images[idx],
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
      {text: 'L-Base', value: BaseType.L_BASE},
      {text: 'Standing', value: BaseType.STANDING},
      {text: 'Belly Base', value: BaseType.BELLY_BASE},
      {text: 'On Hands', value: BaseType.ON_HANDS},
      {text: 'Walking', value: BaseType.WALKING},
      {text: 'Moving', value: BaseType.MOVING},
      {text: 'Other', value: BaseType.OTHER},
    ];
  }

  get url() {
    return this.$store.state.auth.isSignedIn ? '/api/authenticated/images' : '/api/images';
  }
}
</script>

<style lang="scss" scoped>
</style>
