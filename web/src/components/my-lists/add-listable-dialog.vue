<template>
  <v-dialog v-model="show">
    <v-card v-if="list">
      <v-toolbar color="primary" dark dense>{{ $t('action.addToItems', {items: $tc('p.list') + ` "${list.name}"`}) }}</v-toolbar>
      <v-card-text>
        <div class="d-flex align-center mt-5">
          <v-text-field v-model="form.search" :label="$t('field.name')" @keyup.enter="search"/>
          <v-btn color="primary" class="ml-4" @click="search">{{ $t('action.search') }}</v-btn>
        </div>
      </v-card-text>

      <div v-if="poses.length">
        <v-card-text>
          <v-data-table v-model="selection" :items="poses" :headers="headers" show-select>
            <template #item.image="{item}">
              <v-img max-height="60" max-width="60" contain :src="getAttachmentSrc(item)"></v-img>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" :disabled="selection.length <= 0" @click="onAdd">{{ $t('action.add') }}</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, VModel} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AddListableDialog extends Vue {
  @VModel({type: Boolean, default: false}) show: boolean;
  @Prop({default: null}) list: any;
  form = {};
  poses = [];
  selection = [];

  async search() {
    try {
      const response = await this.$api.get(`/api/poses/search`, {params: this.form});
      this.poses = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get headers() {
    return [
      {text: this.$tc('p.image'), value: 'image', sortable: false},
      {text: this.$t('field.name'), value: 'name'},
      {text: this.$t('field.aliases'), value: 'aliases'},
    ];
  }

  getAttachmentSrc(item) {
    return item.attachments[0]?.url;
  }

  async onAdd() {
    try {
      const listableIds = this.selection.map(selection => selection.id);
      const response = await this.$api.put(`/api/my/list/${this.list.id}/add`, {listableIds, listableType: 'pose'});
      const items = response.data;
      this.$notify.success(this.$t('notify.addItemSuccess', {item: this.$tc('p.pose')}));
      this.$emit('success', items);
      this.show = false;
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
