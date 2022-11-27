<template>
  <v-container>
    <v-form>
      <v-card>
        <v-toolbar color="primary" dark dense>
          <breadcrumb-title :title="$t('action.createItem', {item: $tc('p.skill')})"
                            :parents="[{to: {name: 'dictionary'}, text: $t('label.dictionary')},{to: {name: 'skills'}, text: $tc('p.skill', 2)}]"/>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.name" :label="$t('field.name')"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.type" :label="$t('field.type')" :items="typeOptions"/>
            </v-col>
            <v-col cols="12">
              <rich-text-editor v-model="form.description" :label="$t('field.description')"/>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select v-model="form.persons" :items="personOption" :label="$tc('p.person', 2)"/>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select v-model="form.status" :items="statusOptions" :label="$t('field.status')"/>
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-end">
              <v-slider v-model="form.difficulty" :label="$t('field.difficulty')" min="1" max="6" :hint="difficultyLabel" persistent-hint/>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-combobox v-model="form.aliases" chips deletable-chips small-chips multiple :label="$tc('p.alias', 2)"/>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-combobox v-model="form.tags" chips deletable-chips small-chips multiple :label="$tc('p.tag', 2)"/>
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
          <v-btn text :to="{name: 'skills'}" exact>{{ $t('action.cancel') }}</v-btn>
          <v-btn color="primary" @click="submit">{{ $t('action.createItem', {item: $tc('p.skill')}) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {AttachmentType, PoseStatus, SkillType} from '@acrommunity/common';
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
export default class SkillCreatePage extends Page {
  url = '';
  form = {
    name: '',
    description: '',
    type: null,
    persons: 2,
    difficulty: 3,
    tags: [],
    aliases: [],
    attachments: [],
  };

  get title() {
    return this.$t('action.createItem', {item: this.$tc('p.skill')});
  }

  get personOption() {
    return [
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '4', value: 4},
      {text: '5 oder mehr', value: 5},
    ];
  }

  get typeOptions() {
    return Object.values(SkillType).map(value => ({text: this.$t('skillType.' + value), value}));
  }


  get statusOptions() {
    return Object.values(PoseStatus).map(value => ({text: this.$t('status.' + value), value}));
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
      const response = await this.$api.post('/api/skills', this.form);
      await this.$router.push({name: 'skill-details', params: {id: response.data.id}});
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
::v-deep {
  & .v-select.v-select--chips .v-select__selections {
    min-height: 32px;
  }
}
</style>
