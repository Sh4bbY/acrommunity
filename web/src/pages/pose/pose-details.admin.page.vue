<template>
  <v-container v-if="pose">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>
          <breadcrumb-title :title="pose.name" :parents="[{text: $tc('p.pose',2), to: {name: 'poses'}}]"/>
        </v-toolbar-title>
        <fav-button :item="pose" :type="type"/>
        <v-spacer/>
        <tooltip-button icon="mdi-delete" :tooltip="$t('action.deleteItem', {item: $tc('p.pose')})" @click="deletePose"/>
        <v-btn v-if="pose.id > 1" icon :to="{name: 'pose-details', params: {id: pose.id - 1}}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :to="{name: 'pose-details', params: {id: pose.id + 1}}">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <item-menu :item="pose" :type="type"/>
      </v-toolbar>

      <v-card-text>

        <v-text-field v-model="pose.name" :label="$t('field.name')" @change="updateData({name: pose.name})"/>

        <div class="d-flex align-center justify-space-between">
          <h3 class="mb-2">{{ $tc('p.image', 2) }}</h3>
          <v-spacer/>
          <v-text-field v-model="form.url" :label="$tc('p.image')" :placeholder="$t('action.addItem', {item: $tc('p.image')})" persistent-placeholder
                        @keyup.enter="addAttachment(form.url)"/>
        </div>

        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="attachment in pose.attachments" :key="attachment.id">
            <v-sheet class="d-flex flex-column align-center relative" outlined rounded>
              <div class="delete-btn">
                <tooltip-button icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.image')})" @click="removeAttachment(attachment.id)"/>
              </div>
              <div class="copy-btn">
                <tooltip-button icon="mdi-content-copy" :tooltip="$t('action.copyItem', {item: $tc('p.url')})" @click="copyToClipboard(attachment.url)"/>
              </div>
              <embed-attachment :attachment="attachment"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <!--          <v-col cols="12">-->
          <!--            <h3 class="mb-2">{{ $t('field.description') }}</h3>-->
          <!--            <vue-editor v-model="pose.description" @keyup.enter.ctrl="updateData({description: pose.description})"/>-->
          <!--          </v-col>-->
          <v-col cols="12" md="4">
            <v-checkbox v-model="pose.counterbalance" :label="$tc('p.counterbalance')" @change="updateData({counterbalance: pose.counterbalance})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox v-model="pose.easyIn" :label="$t('field.easyIn')" @change="updateData({easyIn: pose.easyIn})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox v-model="pose.easyOut" :label="$t('field.easyOut')" @change="updateData({easyOut: pose.easyOut})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="pose.difficulty" :label="$t('field.difficulty')" :items="difficultyOptions" :class="{highlight: !pose.difficulty}"
                      @change="updateData({difficulty: pose.difficulty})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="pose.persons" :label="$tc('p.person', 2)" :items="personOptions" :class="{highlight: !pose.persons}" @change="updateData({persons: pose.persons})"/>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="pose.status" :label="$t('field.status')" :items="statusOptions" @change="updateData({status: pose.status})"/>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete v-model="pose.basePosition" :label="$t('field.basePosition')" :items="basePositions" :class="{highlight: !pose.basePosition}"
                            @change="updateData({basePosition: pose.basePosition})"/>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete v-model="pose.flyerPosition" :label="$t('field.flyerPosition')" :items="flyerPositions" :class="{highlight: !pose.flyerPosition}"
                            @change="updateData({flyerPosition: pose.flyerPosition})"/>
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <h3 class="mb-2">{{ $tc('p.tag', 2) }}</h3>
              <v-spacer/>
              <v-text-field v-model="form.tag" :label="$tc('p.tag')" :placeholder="$t('action.addItem', {item: $tc('p.tag')})" persistent-placeholder
                            @keyup.enter="addTag(form.tag)"/>
            </div>
            <v-chip v-for="tag of pose.tags" :key="tag.name" small class="mr-1 mb-1" close @click:close="removeTag(tag.id)">{{ tag.name }}</v-chip>
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <h3 class="mb-2">{{ $tc('p.alias', 2) }}</h3>
              <v-spacer/>
              <v-text-field v-model="form.alias" :label="$tc('p.alias')" :placeholder="$t('action.addItem', {item: $tc('p.alias')})" persistent-placeholder
                            @keyup.enter="addAlias(form.alias)"/>
            </div>
            <v-chip v-for="alias of pose.aliases" :key="alias.name" small class="mr-1 mb-1" close @click:close="removeAlias(alias.id)">{{ alias.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title class="d-flex justify-space-between w-100">
          <span>{{ $t('label.transitionTo') }}</span>
          <v-spacer/>
          <v-autocomplete v-model="form.transitionTo" :items="targetTransitions" item-text="name" item-value="id" @change="addTransitionTo" hide-details
                          :placeholder="$t('action.addItem', {item: $tc('p.transition')})">
            <template #item="{item}">
              <div class="pa-2">
                <v-img :src="item.attachments[0].url" max-height="50px" max-width="50px" contain/>
                <span>{{ item.name }}</span>
              </div>
            </template>
          </v-autocomplete>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="target in sortedTargets" :key="'target-'+target.id">
            <v-sheet class="d-flex flex-column align-center relative" outlined rounded>
              <div class="delete-btn">
                <tooltip-button icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.transition')})" @click="removeTransition('target',pose.id, target.id)"/>
              </div>
              <v-img :src="target.attachments[0].url" max-height="150px" contain/>
              <router-link :to="{name: 'pose-details', params: {id: target.id}}">{{ target.name }}</router-link>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title class="d-flex justify-space-between w-100">
          <span>{{ $t('label.transitionFrom') }}</span>
          <v-spacer/>
          <v-autocomplete v-model="form.transitionFrom" :items="sourceTransitions" item-text="name" item-value="id" @change="addTransitionFrom" hide-details
                          :placeholder="$t('action.addItem', {item: $tc('p.transition')})">
            <template #item="{item}">
              <div class="py-1 d-flex align-center">
                <img :src="item.attachments[0].url" style="max-height: 50px" class="mr-3"/>
                <span>{{ item.name }}</span>
              </div>
            </template>
          </v-autocomplete>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="source in sortedSources" :key="'source-'+source.id">
            <v-sheet class="d-flex flex-column align-center relative" outlined rounded>
              <div class="delete-btn">
                <tooltip-button icon="mdi-delete" :tooltip="$t('action.removeItem', {item: $tc('p.transition')})" @click="removeTransition('source',source.id, pose.id)"/>
              </div>
              <v-img :src="source.attachments[0].url" max-height="150px" contain/>
              <router-link :to="{name: 'pose-details', params: {id: source.id}}">{{ source.name }}</router-link>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="pose" :commentable-id="pose.id"/>
  </v-container>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition, Status} from '@acrommunity/common';
import {Component, Watch} from 'vue-property-decorator';
import {VueEditor} from 'vue2-editor';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import BreadcrumbTitle from '~/components/breadcrumb-title.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, TooltipButton, BreadcrumbTitle, ItemMenu, FavButton, EmbedAttachment, VueEditor},
})
export default class PoseDetailsAdminPage extends Page {
  pose: any = null;
  sources: any = [];
  targets: any = [];
  form = {
    tag: '',
    alias: '',
    url: '',
    transitionFrom: null,
    transitionTo: null,
  };

  async mounted() {
    await this.$store.dispatch('app/fetchPoses');
  }

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const [response, responseT] = await Promise.all([
        this.$api.get(`/api/poses/${id}`),
        this.$api.get(`/api/poses/${id}/transitions`),
      ]);
      this.pose = response.data;
      this.sources = responseT.data.sources;
      this.targets = responseT.data.targets;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.pose?.name || this.$tc('p.pose') + ' ID:' + this.$route.params.id;
  }

  get difficultyOptions() {
    return [1, 2, 3, 4, 5, 6].map(value => ({text: resolveDifficulty(value, this), value}));
  }

  get personOptions() {
    return [1, 2, 3, 4, 5, 6];
  }

  get statusOptions() {
    return Object.values(Status).map(value => ({text: this.$t('status.' + value), value}));
  }

  get flyerPositions() {
    return Object.values(FlyerPosition).map(value => ({text: this.$t('flyerPosition.' + value), value}));
  }

  get basePositions() {
    return Object.values(BasePosition).map(value => ({text: this.$t('basePosition.' + value), value}));
  }

  get type() {
    return 'pose';
  }

  async removeTag(tagId: number) {
    try {
      await this.$api.delete(`/api/poses/${this.pose.id}/remove-tag/${tagId}`);
      const idx = this.pose.tags.findIndex(t => t.id === tagId);
      this.pose.tags.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeAlias(aliasId: number) {
    try {
      await this.$api.delete(`/api/poses/${this.pose.id}/remove-alias/${aliasId}`);
      const idx = this.pose.aliases.findIndex(a => a.id === aliasId);
      this.pose.aliases.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeTransition(type: string, sourceId: number, targetId: number) {
    try {
      await this.$api.delete(`/api/poses/${sourceId}/remove-transition/${targetId}`);
      if (type === 'source') {
        const idx = this.sources.findIndex(p => p.id === sourceId);
        this.sources.splice(idx, 1);
      } else if (type === 'target') {
        const idx = this.targets.findIndex(p => p.id === targetId);
        this.targets.splice(idx, 1);
      }
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async updateData(data) {
    try {
      await this.$api.patch(`/api/poses/${this.pose.id}`, data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addTag(tag: string) {
    if (!tag.trim() || this.pose.tags.find(t => t.name === tag.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/poses/${this.pose.id}/tag/${tag.trim()}`);
      this.form.tag = '';
      this.pose.tags.push(response.data.tag);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addAlias(alias: string) {
    if (!alias.trim() || this.pose.aliases.find(a => a.name === alias.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/poses/${this.pose.id}/alias/${alias.trim()}`);
      this.form.alias = '';
      this.pose.aliases.push(response.data);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addAttachment(url: string) {
    if (!url.trim() || this.pose.attachments.find(a => a.url === url.trim())) {
      return;
    }
    try {
      const response = await this.$api.post(`/api/poses/${this.pose.id}/attachment`, {url});
      this.pose.attachments.push(response.data.attachment);
      this.form.url = '';
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async removeAttachment(attachmentId: number) {
    try {
      await this.$api.delete(`/api/poses/${this.pose.id}/attachment/${attachmentId}`);
      const idx = this.pose.attachments.findIndex(a => a.id === attachmentId);
      this.pose.attachments.splice(idx, 1);
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async addTransitionFrom(sourcePoseId: number) {
    try {
      await this.$api.post(`/api/poses/${this.pose.id}/transition-from/${sourcePoseId}`);
      const pose = this.$store.state.app.poses.find(p => p.id === sourcePoseId);
      this.sources.push(pose);
      this.form.transitionFrom = '';
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get targetTransitions() {
    return this.$store.state.app.poses.filter(p => p.id !== this.pose.id && !this.targets.find(tp => tp.id === p.id));
  }

  get sourceTransitions() {
    return this.$store.state.app.poses.filter(p => p.id !== this.pose.id && !this.sources.find(sp => sp.id === p.id));
  }

  get sortedTargets() {
    return this.targets.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  }

  get sortedSources() {
    return this.sources.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  }


  async addTransitionTo(sourcePoseId: number) {
    try {
      await this.$api.post(`/api/poses/${this.pose.id}/transition-to/${sourcePoseId}`);
      const pose = this.$store.state.app.poses.find(p => p.id === sourcePoseId);
      this.targets.push(pose);
      this.form.transitionTo = '';
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async deletePose() {
    try {
      await this.$api.delete(`/api/poses/${this.pose.id}`);
      this.targets.push({name: 'pose-details', params: {id: this.pose.id + 1}});
      this.$notify.success(this.$t('notify.deleteSuccess'));
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
