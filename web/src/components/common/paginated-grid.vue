<template>
  <v-data-iterator v-bind="$attrs" v-on="$listeners"
                   :items="items" :server-items-length="totalItems" :loading="loading" :options.sync="iteratorOptions" :footer-props="footerProps">
    <template #default="{ items}">
      <slot name="items" v-bind:items="items">
        <v-row>
          <v-col v-for="item in items" :key="item.name" cols="12" :sm="sm" :md="md" :lg="lg">
            <slot name="item" v-bind:item="item">
              <div :style="colStyle">{{ item }} {{ colStyle }}</div>
            </slot>
          </v-col>
        </v-row>
      </slot>
    </template>
    <template #loading>
      <div class="d-flex align-center justify-center py-10">
        <v-progress-circular indeterminate color="primary" :size="100" :width="10">
          <span class="text-small">Loading</span>
        </v-progress-circular>
      </div>
    </template>
    <template #no-data>
      <div class="no-data">{{ $t('msg.noDataFound') }}</div>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

export interface DataIteratorOptions {
  groupBy: string[],
  groupDesc: boolean[],
  itemsPerPage: 12,
  mustSort: boolean,
  multiSort: boolean,
  page: number,
  sortBy: string[],
  sortDesc: boolean[],
}

@Component
export default class PaginatedImageGrid extends Vue {
  @Prop({default: null, required: true}) readonly url!: string;
  @Prop({default: () => ({}), type: Object}) readonly searchParams!: any;
  @Prop({default: 6, type: Number}) readonly sm!: string;
  @Prop({default: 4, type: Number}) readonly md!: string;
  @Prop({default: 3, type: Number}) readonly lg!: string;
  @Prop({default: '10px', type: String}) readonly gridSize!: string;
  @Prop({default: () => [], type: Array}) readonly relations!: string[];
  @Prop({default: () => ({}), type: Object}) readonly options!: DataIteratorOptions;

  iteratorOptions = {
    groupBy: [],
    groupDesc: [],
    itemsPerPage: 12,
    mustSort: true,
    multiSort: false,
    page: 1,
    sortBy: ['id'],
    sortDesc: [true],
  };

  footerProps = {
    itemsPerPageOptions: [12, 24, 48, 96],
  };

  items: any[] = [];
  totalItems = -1;
  loading = false;

  @Watch('query')
  async watchQuery() {
    await this.fetchData();
  }

  @Watch('options', {immediate: true})
  async watchOptions() {
    this.iteratorOptions = Object.assign({}, this.iteratorOptions, this.options);
  }

  @Watch('iteratorOptions')
  async watchIteratorOptions() {
    await this.fetchData();
  }

  @Watch('searchParams')
  async watchSearchParams(newParams, oldParams) {
    if (newParams.q !== oldParams.q) {
      this.options.page = 1;
    }
    await this.fetchData();
  }

  get colStyle() {
    return {
      padding: this.gridSize,
      margin: this.gridSize,
    };
  }

  async fetchData() {
    try {
      this.loading = true;
      const params: any = {};

      if (this.iteratorOptions) {
        const pagination = this.iteratorOptions;
        params.offset = (pagination.page - 1) * pagination.itemsPerPage;
        params.limit = pagination.itemsPerPage;
        params.order = pagination.sortBy.map((field: string, index: number) => `${field}:${pagination.sortDesc[index] ? 'DESC' : 'ASC'}`);
        Object.assign(params, {filter: this.searchParams});
      }
      const response = await this.$api.get(this.url, {params});
      this.items = response.data.rows;
      this.totalItems = response.data.count;
      this.$emit('update', this.items);
    } catch (err) {
      this.$notify.error(err);
    }
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  text-align: center;
  color: rgba(#777, 0.8);
}

::v-deep .v-data-footer {
  justify-content: space-evenly;
}
</style>
