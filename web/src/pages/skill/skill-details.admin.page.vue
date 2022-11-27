<template>
  <v-container v-if="skill">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>
          <breadcrumb-title :title="skill.name" :parents="[{text: $tc('p.skill',2), to: {name: 'skills'}}]"/>
        </v-toolbar-title>
        <fav-button :item="skill" :type="type"/>
        <v-spacer/>
        <tooltip-button icon="mdi-delete" :tooltip="$t('action.deleteItem', {item: $tc('p.skill')})" @click="deleteSkill"/>
        <v-btn v-if="skill.id > 1" icon :to="{name: 'skill-details', params: {id: skill.id - 1}}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :to="{name: 'skill-details', params: {id: skill.id + 1}}">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <item-menu :item="skill" :type="type"/>
      </v-toolbar>

      <v-card-text>
        <v-text-field v-model="skill.name" :label="$t('field.name')" @change="updateData({name: skill.name})"/>
        <div class="d-flex align-center justify-space-between">
          <h3 class="mb-2">{{ $tc('p.attachment', 2) }}</h3>
          <v-spacer/>
          <v-text-field v-model="form.url" :label="$tc('p.image')" :placeholder="$t('action.addItem', {item: $tc('p.attachment')})" persistent-placeholder
                        @keyup.enter="addAttachment(form.url)"/>
        </div>

        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="attachment in skill.attachments" :key="attachment.id">
            <v-sheet class="d-flex flex-column align-center relative" outlined rounded>
              <div class="delete-btn">
                <tooltip-button icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.image')})" color="grey" @click="removeAttachment(attachment.id)"/>
              </div>
              <div class="copy-btn">
                <tooltip-button icon="mdi-content-copy" :tooltip="$t('action.copyItem', {item: $tc('p.url')})" color="grey" @click="copyToClipboard(attachment.url)"/>
              </div>
              <embed-attachment :attachment="attachment"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h3 class="mb-2">{{ $t('field.description') }}</h3>
            <vue-editor v-model="skill.description" @keyup.enter.ctrl="updateData({description: skill.description})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="skill.type" :label="$t('field.type')" :items="typeOptions" :class="{highlight: !skill.type}"
                      @change="updateData({type: skill.type})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="skill.difficulty" :label="$t('field.difficulty')" :items="difficultyOptions" :class="{highlight: !skill.difficulty}"
                      @change="updateData({difficulty: skill.difficulty})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="skill.persons" :label="$tc('p.person', 2)" :items="personOptions" :class="{highlight: !skill.persons}"
                      @change="updateData({persons: skill.persons})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="skill.status" :label="$t('field.status')" :items="statusOptions" @change="updateData({status: skill.status})"/>
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <h3 class="mb-2">{{ $tc('p.tag', 2) }}</h3>
              <v-spacer/>
              <v-text-field v-model="form.tag" :label="$tc('p.tag')" :placeholder="$t('action.addItem', {item: $tc('p.tag')})" persistent-placeholder
                            @keyup.enter="addTag(form.tag)"/>
            </div>
            <v-chip v-for="tag of skill.tags" :key="tag.name" small class="mr-1 mb-1" close @click:close="removeTag(tag.id)">{{ tag.name }}</v-chip>
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <h3 class="mb-2">{{ $tc('p.alias', 2) }}</h3>
              <v-spacer/>
              <v-text-field v-model="form.alias" :label="$tc('p.alias')" :placeholder="$t('action.addItem', {item: $tc('p.alias')})" persistent-placeholder
                            @keyup.enter="addAlias(form.alias)"/>
            </div>
            <v-chip v-for="alias of skill.aliases" :key="alias.name" small class="mr-1 mb-1" close @click:close="removeAlias(alias.id)">{{ alias.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="skill" :commentable-id="skill.id"/>
  </v-container>
</template>

<script lang="ts">
import {PoseStatus, SkillType} from '@acrommunity/common';
import {Component, Watch} from 'vue-property-decorator';
import {VueEditor} from 'vue2-editor';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, TooltipButton, BreadcrumbTitle, ItemMenu, FavButton, EmbedAttachment, VueEditor},
})
export default class SkillDetailsAdminPage extends Page {
  skill: any = null;
  sources: any = [];
  targets: any = [];
  form = {
    tag: '',
    alias: '',
    url: '',
    transitionFrom: null,
    transitionTo: null,
  };

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const response = await this.$api.get(`/api/skills/${id}`);
      this.skill = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.skill?.name || this.$tc('p.skill') + ' ID:' + this.$route.params.id;
  }

  get difficultyOptions() {
    return [1, 2, 3, 4, 5, 6].map(value => ({text: resolveDifficulty(value, this), value}));
  }

  get personOptions() {
    return [1, 2, 3, 4, 5, 6];
  }

  get statusOptions() {
    return Object.values(PoseStatus).map(value => ({text: this.$t('status.' + value), value}));
  }

  get typeOptions() {
    return Object.values(SkillType).map(value => ({text: this.$t('skillType.' + value), value}));
  }

  get type() {
    return 'skill';
  }

  async updateData(data) {
    try {
      await this.$api.patch(`/api/skills/${this.skill.id}`, data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addTag(tag: string) {
    if (!tag.trim() || this.skill.tags.find(t => t.name === tag.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/skills/${this.skill.id}/tag/${tag.trim()}`);
      this.form.tag = '';
      this.skill.tags.push(response.data.tag);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeTag(tagId: number) {
    try {
      await this.$api.delete(`/api/skills/${this.skill.id}/remove-tag/${tagId}`);
      const idx = this.skill.tags.findIndex(t => t.id === tagId);
      this.skill.tags.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addAlias(alias: string) {
    if (!alias.trim() || this.skill.aliases.find(a => a.name === alias.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/skills/${this.skill.id}/alias/${alias.trim()}`);
      this.form.alias = '';
      this.skill.aliases.push(response.data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeAlias(aliasId: number) {
    try {
      await this.$api.delete(`/api/skills/${this.skill.id}/remove-alias/${aliasId}`);
      const idx = this.skill.aliases.findIndex(a => a.id === aliasId);
      this.skill.aliases.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addAttachment(url: string) {
    if (!url.trim() || this.skill.attachments.find(a => a.url === url.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/skills/${this.skill.id}/attachment`, {url});
      this.skill.attachments.push(response.data.attachment);
      this.form.url = '';
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeAttachment(attachmentId: number) {
    try {
      await this.$api.delete(`/api/skills/${this.skill.id}/attachment/${attachmentId}`);
      const idx = this.skill.attachments.findIndex(a => a.id === attachmentId);
      this.skill.attachments.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async deleteSkill() {
    try {
      await this.$api.delete(`/api/skills/${this.skill.id}`);
      this.$notify.success(this.$t('notify.deleteSuccess'));
      await this.$router.push({name: 'skill-details', params: {id: this.skill.id + 1}});
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async copyToClipboard(text: string) {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
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

  .copy-btn {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.highlight ::v-deep {
  .v-label {
    color: red !important;
  }
}
</style>
