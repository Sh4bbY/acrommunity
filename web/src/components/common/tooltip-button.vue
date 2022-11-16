<template>
  <v-tooltip top :open-delay="400" :left="left">
    <template #activator="{on}">
      <v-btn v-on="{...on, ...$listeners}" v-bind="$attrs" :disabled="disabled" :icon="!!icon" :color="color" :small="smallBtn || small" class="mx-0">
        <v-icon :small="small">{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class TooltipButton extends Vue {
  @Prop() value: any;
  @Prop({type: String, default: ''}) color!: string;
  @Prop({type: String, default: ''}) tooltip!: string;
  @Prop({type: String}) icon!: string;
  @Prop({type: Boolean, default: false}) small!: boolean;
  @Prop({type: Boolean, default: false}) smallBtn!: boolean;
  @Prop({type: Boolean, default: false}) left!: boolean;
  @Prop({type: Boolean, default: false}) disabled!: boolean;
}
</script>
