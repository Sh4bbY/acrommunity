<template>
  <v-menu offset-x left>
    <template #activator="{on}">
      <slot name="activator" v-bind="{on}">
        <v-btn v-on="on" icon>
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </slot>
    </template>
    <v-list>
      <v-list-item v-for="(item, idx) in items" :key="'item-' + idx" @click="handleClick(item)">
        <v-list-item-icon v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class ContextMenu extends Vue {
  @Prop({type: String, default: 'mdi-dots-vertical'}) icon!: string;
  @Prop({type: Array, default: () => []}) items!: any[];

  handleClick(item) {
    if (item.onClick) {
      item.onClick();
    }
    if (item.emit) {
      this.$emit(item.emit, item);
    }
  }
}
</script>
