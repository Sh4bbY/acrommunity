<template>
  <v-tooltip top :open-delay="400">
    <template #activator="{on}">
      <span v-on="on">
      <span v-if="humanize">{{ humanizedValue }}</span>
      <span v-else>{{ formattedValue }}</span>
      </span>
    </template>
    <span>{{ formattedTooltip }} {{ $t('label.oClock') }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Moment extends Vue {
  @Prop() value: any;
  @Prop({default: 'DD.MM.YYYY'}) format!: string;
  @Prop({default: 'DD.MM.YYYY - HH:mm'}) tooltipFormat!: string;
  @Prop({default: false, type: Boolean}) humanize!: boolean;

  get formattedValue(): string {
    return moment(this.value).format(this.format);
  }

  get formattedTooltip(): string {
    return moment(this.value).format(this.tooltipFormat);
  }

  get humanizedValue(): string {
    return moment(new Date()).to(this.value);
  }
}
</script>
