<template>
  <v-container>
    <v-form>
      <v-card>
        <v-toolbar color="primary" dark dense>
          <breadcrumb-title :title="$t('action.createItem', {item: $tc('p.flow')})"
                            :parents="[{to: {name: 'dictionary'}, text: $t('label.dictionary')},{to: {name: 'flows'}, text: $tc('p.flow', 2)}]"/>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.name" :label="$t('field.name')"/>
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-end">
              <v-slider v-model="form.difficulty" :label="$t('field.difficulty')" min="1" max="6" :hint="difficultyLabel" persistent-hint/>
            </v-col>
            <v-col cols="12">
              <rich-text-editor v-model="form.description" :label="$t('field.description')"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-combobox v-model="form.aliases" chips deletable-chips multiple :label="$tc('p.alias', 2)"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox v-model="form.tags" chips deletable-chips multiple :label="$tc('p.tag', 2)"/>
            </v-col>
          </v-row>
          <div class="d-flex align-center justify-space-between">
            <h3 class="mb-2">{{ $tc('p.attachment', 2) }}</h3>
            <v-spacer/>
            <v-text-field v-model="url" :label="$tc('p.attachment')" :placeholder="$t('action.addItem', {item: $tc('p.attachment')})" persistent-placeholder
                          @keyup.enter="addAttachment(url)"/>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="(attachment,idx) in form.attachments" :key="attachment.id">
              <v-sheet class="d-flex flex-column align-center relative" outlined rounded>
                <div class="delete-btn">
                  <tooltip-button color="grey" icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.attachment')})" @click="removeAttachment(idx)"/>
                </div>
                <embed-attachment :attachment="attachment"/>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text class="mr-2" :to="{name: 'flows'}" exact>{{ $t('action.cancel') }}</v-btn>
          <v-btn color="primary" @click="submit">{{ $t('action.createItem', {item: $tc('p.flow')}) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {AttachmentType} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import RichTextEditor from '~/components/common/rich-text-editor.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {RichTextEditor, TooltipButton, EmbedAttachment, BreadcrumbTitle},
})
export default class FlowCreatePage extends Page {
  form = {
    name: '',
    description: '',
    difficulty: 3,
    tags: [],
    aliases: [],
    attachments: [],
  };
  url = '';

  get title() {
    return this.$t('action.createItem', {item: this.$tc('p.flow')});
  }

  addAttachment() {
    this.form.attachments.push({url: this.url, type: AttachmentType.YouTube});
    this.url = '';
  }

  removeAttachment(idx: number) {
    this.form.attachments.splice(idx, 1);
  }

  async submit() {
    try {
      const response = await this.$api.post('/api/flows', this.form);
      this.$notify.success(this.$t('notify.createItemSuccess', {item: this.$tc('p.flow')}));
      await this.$router.push({name: 'flow-details', params: {id: response.data.id}});
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get difficultyLabel() {
    return resolveDifficulty(this.form.difficulty, this);
  }
}
</script>

<style lang="scss" scoped>
.relative {
  position: relative;

  .delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}

</style>
