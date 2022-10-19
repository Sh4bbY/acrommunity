<template>
  <v-data-table v-bind="$attrs" v-on="$listeners" :items="items" :server-items-length="totalItems" :loading="loading" :options.sync="options"
                @click:row="onRowClick">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class PaginatedTable extends Vue {
  @Prop({default: null, required: true}) readonly url!: string;
  @Prop({default: () => ({}), type: Object}) readonly searchParams!: any;
  @Prop({default: () => [], type: Array}) readonly relations!: string[];
  @Prop({default: () => ({}), type: Object}) readonly where!: any;
  @Prop({default: false, type: Boolean}) readonly expand!: boolean;

  options = {
    groupBy: [],
    groupDesc: [],
    itemsPerPage: 10,
    mustSort: true,
    multiSort: false,
    page: 1,
    sortBy: ['id'],
    sortDesc: [false],
  };

  items: any[] = [];
  totalItems = -1;
  loading = false;

  @Watch('options')
  async watchOptions() {
    await this.fetchData();
  }

  @Watch('searchParams')
  async watchSearchParams(newParams, oldParams) {
    console.log('watched!', newParams);
    if (newParams.q !== oldParams.q) {
      this.options.page = 1;
    }
    await this.fetchData();
  }

  async fetchData() {
    try {
      this.loading = true;
      const params: any = {};

      if (this.options) {
        const pagination = this.options;
        params.offset = (pagination.page - 1) * pagination.itemsPerPage;
        params.limit = pagination.itemsPerPage;
        params.order = pagination.sortBy.map((field: string, index: number) => `${field}:${pagination.sortDesc[index] ? 'DESC' : 'ASC'}`);
        Object.assign(params, this.searchParams);
      }
      const response = await this.$api.get(this.url, {params});
      this.items = response.data.rows;
      this.totalItems = response.data.count;
    } catch (err) {
      this.$notify.error(err);
    }
    this.loading = false;
  }

  onRowClick(item, slot) {
    if (this.expand) {
      slot.expand(!slot.isExpanded);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
