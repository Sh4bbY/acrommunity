<template>
  <v-container v-if="flow">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>
          <breadcrumb-title :title="flow.name" :parents="[{text: $tc('p.flow', 2), to: {name: 'flows'}}]"/>
        </v-toolbar-title>
        <fav-button :item="flow" :type="type"/>
        <v-spacer/>
        <tooltip-button icon="mdi-delete" :tooltip="$t('action.deleteItem', {item: $tc('p.flow')})" @click="deleteFlow"/>
        <v-btn v-if="flow.id > 1" icon :to="{name: 'flow-details', params: {id: flow.id - 1}}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :to="{name: 'flow-details', params: {id: flow.id + 1}}">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <item-menu :item="flow" :type="type"/>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="flow.name" :label="$t('field.name')" @change="updateData({name: flow.name})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="flow.difficulty" :label="$t('field.difficulty')" :items="difficultyOptions" :class="{highlight: !flow.difficulty}"
                      @change="updateData({difficulty: flow.difficulty})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="flow.status" :label="$t('field.status')" :items="statusOptions" @change="updateData({status: flow.status})"/>
          </v-col>
          <v-col cols="12">
            <rich-text-editor v-model="flow.description" :label="$t('field.description')" @change="updateData({description: flow.description})"/>
          </v-col>


          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <h3 class="mb-2">{{ $tc('p.tag', 2) }}</h3>
              <v-spacer/>
              <v-text-field v-model="form.tag" :label="$tc('p.tag')" :placeholder="$t('action.addItem', {item: $tc('p.tag')})" persistent-placeholder
                            @keyup.enter="addTag(form.tag)"/>
            </div>
            <v-chip v-for="tag of flow.tags" :key="tag.name" small class="mr-1 mb-1" close @click:close="removeTag(tag.id)">{{ tag.name }}</v-chip>
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <h3 class="mb-2">{{ $tc('p.alias', 2) }}</h3>
              <v-spacer/>
              <v-text-field v-model="form.alias" :label="$tc('p.alias')" :placeholder="$t('action.addItem', {item: $tc('p.alias')})" persistent-placeholder
                            @keyup.enter="addAlias(form.alias)"/>
            </div>
            <v-chip v-for="alias of flow.aliases" :key="alias.name" small class="mr-1 mb-1" close @click:close="removeAlias(alias.id)">{{ alias.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="d-flex align-center justify-space-between">
      <h3 class="mb-2">{{ $tc('p.attachment', 2) }}</h3>
      <v-spacer/>
      <v-text-field v-model="form.url" :label="$tc('p.attachment')" :placeholder="$t('action.addItem', {item: $tc('p.attachment')})" persistent-placeholder
                    @keyup.enter="addAttachment(form.url)"/>
    </div>

    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="attachment in flow.attachments" :key="attachment.id">
        <v-sheet class="d-flex flex-column align-center relative" outlined rounded>
          <div class="delete-btn">
            <tooltip-button color="white" icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.attachment')})" @click="removeAttachment(attachment.id)"/>
          </div>
          <div class="copy-btn">
            <tooltip-button color="white" icon="mdi-content-copy" :tooltip="$t('action.copyItem', {item: $tc('p.url')})" @click="copyToClipboard(attachment.url)"/>
          </div>
          <embed-attachment :attachment="attachment"/>
        </v-sheet>
      </v-col>
    </v-row>

    <v-spacer class="my-5"/>
    <comments-panel commentable-type="flow" :commentable-id="flow.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import RichTextEditor from '~/components/common/rich-text-editor.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import {resolveDifficulty} from '~/utils';
import {FlowStatus} from '../../../../common';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, EmbedAttachment, BreadcrumbTitle, RichTextEditor, TooltipButton, FavButton, ItemMenu},
})
export default class FlowDetailsAdminPage extends Page {
  flow: any = null;
  form = {
    tag: '',
    alias: '',
    url: '',
  };

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const response = await this.$api.get(`/api/flows/${id}`);
      this.flow = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async updateData(data) {
    try {
      await this.$api.patch(`/api/flows/${this.flow.id}`, data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addTag(tag: string) {
    if (!tag.trim() || this.flow.tags.find(t => t.name === tag.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/flows/${this.flow.id}/tag/${tag.trim()}`);
      this.form.tag = '';
      this.flow.tags.push(response.data.tag);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeTag(tagId: number) {
    try {
      await this.$api.delete(`/api/flows/${this.flow.id}/remove-tag/${tagId}`);
      const idx = this.flow.tags.findIndex(t => t.id === tagId);
      this.flow.tags.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addAlias(alias: string) {
    if (!alias.trim() || this.flow.aliases.find(a => a.name === alias.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/flows/${this.flow.id}/alias/${alias.trim()}`);
      this.form.alias = '';
      this.flow.aliases.push(response.data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeAlias(aliasId: number) {
    try {
      await this.$api.delete(`/api/flows/${this.flow.id}/remove-alias/${aliasId}`);
      const idx = this.flow.aliases.findIndex(a => a.id === aliasId);
      this.flow.aliases.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addAttachment(url: string) {
    if (!url.trim() || this.flow.attachments.find(a => a.url === url.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/flows/${this.flow.id}/attachment`, {url});
      this.flow.attachments.push(response.data.attachment);
      this.form.url = '';
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeAttachment(attachmentId: number) {
    try {
      await this.$api.delete(`/api/flows/${this.flow.id}/attachment/${attachmentId}`);
      const idx = this.flow.attachments.findIndex(a => a.id === attachmentId);
      this.flow.attachments.splice(idx, 1);
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

  async deleteFlow() {
    try {
      await this.$api.delete(`/api/flows/${this.flow.id}`);
      this.$notify.success(this.$t('notify.deleteSuccess'));
      await this.$router.push({name: 'flow-details', params: {id: this.flow.id + 1}});
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.flow?.name || this.$tc('p.flow');
  }

  get type() {
    return 'flow';
  }

  get difficultyLabel() {
    return resolveDifficulty(this.flow.difficulty, this);
  }

  get statusOptions() {
    return Object.values(FlowStatus).map(value => ({text: this.$t('status.' + value), value}));
  }

  get difficultyOptions() {
    return [1, 2, 3, 4, 5, 6].map(value => ({text: resolveDifficulty(value, this), value}));
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
