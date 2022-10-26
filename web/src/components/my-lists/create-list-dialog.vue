<template>
  <v-dialog v-model="show">
    <v-card>
      <v-toolbar color="primary" dark dense>{{ $t('action.createItem', {item: $tc('p.list')}) }}</v-toolbar>
      <v-card-text>
        <v-text-field v-model="form.name" :label="$t('field.name')"/>
        <v-text-field v-model="form.icon" :label="$t('field.icon')"/>
        <v-checkbox v-model="form.isPublic" :label="$t('field.isPublic')"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text class="mr-2" @click="show=false">{{ $t('action.cancel') }}</v-btn>
        <v-btn color="primary" @click="createList">{{ $t('action.create') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class CreateListDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;
  form = {};

  async createList() {
    try {
      const list = await this.$store.dispatch('user/createList', this.form);
      this.show = false;
      this.$emit('success', list);
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
