<template>
  <v-dialog v-model="show">
    <v-card>
      <v-toolbar color="primary" dark dense>{{ $t('action.updateItem', {item: $tc('p.list')}) }}</v-toolbar>
      <v-card-text>
        <v-text-field v-model="form.name" :label="$t('field.name')"/>
        <v-text-field v-model="form.icon" :label="$t('field.icon')"/>
        <v-checkbox v-model="form.isPublic" :label="$t('field.isPublic')"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
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
      await this.$api.put(`/api/my/list/${this.list.id}`, this.form);
      this.show = false;
      this.$emit('success', Object.assign({}, this.list, this.form));
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
