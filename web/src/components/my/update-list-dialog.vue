<template>
  <v-dialog v-model="show">
    <v-card>
      <v-toolbar color="primary" dark dense>{{ $t('action.updateItem', {item: $tc('p.list')}) }}</v-toolbar>
      <v-card-text>
        <v-text-field v-model="form.name" :label="$t('field.name')"/>
        <v-select v-model="form.icon" :label="$t('field.icon')" :items="icons" clearable>
          <template #selection="{item}">
            <v-icon>{{ item }}</v-icon>
          </template>
          <template #item="{item}">
            <v-icon>{{ item }}</v-icon>
          </template>
        </v-select>
        <v-checkbox v-model="form.isPublic" :label="$t('field.isPublic')"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text class="mr-2" @click="show=false">{{ $t('action.cancel') }}</v-btn>
        <v-btn color="primary" @click="updateList">{{ $t('action.apply') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, VModel, Watch} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class UpdateListDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;
  @Prop({default: null}) list: any;
  form = {};

  @Watch('list')
  watchList(list) {
    this.form = list ? {
      name: list.name,
      icon: list.icon,
      isPublic: list.isPublic,
    } : {};
  }

  async updateList() {
    try {
      const list = await this.$store.dispatch('user/updateList', {list: this.list, form: this.form});
      this.show = false;
      this.$emit('success', list);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get icons() {
    return ['mdi-cog', 'mdi-wrench', 'mdi-heart'];
  }
}
</script>

<style lang="scss" scoped>
</style>
