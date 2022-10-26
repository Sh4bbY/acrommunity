<template>
  <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
    <template #item="{item}">
      <router-link v-if="item.to" :to="item.to">{{ item.text }}</router-link>
      <span v-else>{{ item.text }}</span>
    </template>
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class BreadcrumbTitle extends Vue {
  @Prop() item: any;
  @Prop({type: String}) title: string;
  @Prop({type: String, required: true}) type!: string;


  get breadcrumbs() {
    const items: any = [
      {text: this.$tc('p.' + this.type, 2), to: {name: this.type + 's'}},
    ];
    if (this.item) {
      items.push({text: this.item.name});
    } else if (this.title) {
      items.push({text: this.title});
    }
    return items;
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  font-size: 16px;
  padding-left: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline;
  width: 100%;

  a {
    color: white;
  }
}
</style>
