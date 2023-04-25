<template>
  <v-container>
    <media-dialog v-model="dialog.show" :item="dialog.item" type="video" :fullscreen="$vuetify.breakpoint.xs" :is-first="dialog.isFirst" :is-last="dialog.isLast"
                  @next="loadNextVideo" @prev="loadPrevVideo"/>
    <div v-if="$store.state.auth.isSignedIn">
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'videos'" :to="{name: 'videos'}" rounded>{{ $t('label.all') }}</v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'video-favorites'" :to="{name: 'video-favorites'}" rounded>
        <v-icon left small>mdi-heart</v-icon>
        {{ $tc('p.favorite', 2) }}
      </v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'video-repertoire'" :to="{name: 'video-repertoire'}" rounded>
        <v-icon left small>mdi-arm-flex</v-icon>
        {{ $tc('label.repertoire') }}
      </v-btn>
      <v-btn small class="mr-2 mb-2" color="primary" :disabled="$route.name === 'video-training-plan'" :to="{name: 'video-training-plan'}" rounded>
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
            <v-col cols="12" sm="12" md="3" class="d-flex align-center justify-end">
              <v-spacer/>
              <v-btn color="primary" @click="applyFilter">
                {{ $t('action.apply') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
      <paginated-grid :url="url" :options="options" :search-params="searchParams" @update="videos=$event">
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
  components: {PaginatedGrid, TooltipButton, MediaDialog, BreadcrumbTitle},
})
export default class VideosPage extends Page {
  videos = [];
  filter = {
    persons: 2,
    bases: 1,
    baseType: null,
  };
  dialog = {
    show: false,
    item: null,
    isFirst: false,
    isLast: false,
  };
  showFilter = true;
  options = {
    itemsPerPage: 24,
    sortBy: ['id'],
    sortDesc: [false],
  };
  searchParams: any = {};


  beforeMount() {
    this.filter.persons = this.$store.state.filter.videos.persons;
    this.filter.bases = this.$store.state.filter.videos.bases;
    this.filter.baseType = this.$store.state.filter.videos.baseType;

    this.searchParams = Object.assign(this.searchParams, this.filter, this.$route.query);
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
      ...this.filter,
      favorites: this.$route.name === 'video-favorites' ? true : undefined,
      repertoire: this.$route.name === 'video-repertoire' ? true : undefined,
      workingOn: this.$route.name === 'video-training-plan' ? true : undefined,
    };
  }

  public created() {
    this.searchParams = Object.assign({}, this.filter);
  }

  get breadcrumbTitle() {
    switch (this.$route.name) {
      case 'video-favorites':
        return this.$tc('p.favorite', 2);
      case 'video-repertoire':
        return this.$t('label.repertoire');
      case 'video-training-plan':
        return this.$t('label.trainingPlan');
      default:
        return this.title;
    }
  }

  get parents() {
    const items = [
      {to: {name: 'dictionary'}, text: this.$t('label.dictionary')},
    ];
    if (this.$route.name !== 'videos') {
      items.push({to: {name: 'videos'}, text: this.$tc('p.video', 2)});
    }
    return items;
  }


  get title() {
    return this.$tc('p.video', 2);
  }

  applyFilter() {
    this.searchParams = {
      ...this.routeSearchParams,
      persons: this.filter.persons === null ? undefined : this.filter.persons,
      bases: this.filter.bases === null ? undefined : this.filter.bases,
      baseType: this.filter.baseType === null ? undefined : this.filter.baseType,
    };
    this.$store.commit('filter/updateVideosFilter', this.filter);
  }

  showDialog(item) {
    const idx = this.videos.findIndex(v => v.id === item.id);
    this.$router.push({hash: '#show-' + item.id});
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
    return this.$store.state.auth.isSignedIn ? '/api/authenticated/videos' : '/api/videos';
  }
}
</script>

<style lang="scss" scoped>
</style>
