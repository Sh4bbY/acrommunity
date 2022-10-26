<template>
  <v-container v-if="flow">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <breadcrumb-title :item="flow" :type="type"/>
        <v-spacer/>
        <v-btn v-if="flow.id > 1" icon :to="{name: 'flow-details', params: {id: flow.id - 1}}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :to="{name: 'flow-details', params: {id: flow.id + 1}}">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h2 class="mb-2">{{ $t('field.description') }}</h2>
            <p>{{ flow.description }}</p>
            <v-spacer class="my-5"/>
          </v-col>

          <v-col v-if="flow.difficulty" cols="12" md="4">
            <h3 class="mb-2">{{ $t('field.difficulty') }}</h3>
            <p>{{ flow.difficulty }} ({{ difficultyLabel }})</p>
            <v-spacer class="my-5"/>
          </v-col>

          <v-col v-if="flow.tags.length > 0" cols="12" md="4">
            <h2 class="mb-2">{{ $tc('p.tag', 2) }}</h2>
            <v-chip v-for="tag of flow.tags" :key="tag.name" small>{{ tag.name }}</v-chip>
            <v-spacer class="my-5"/>
          </v-col>

          <v-col v-if="flow.aliases.length > 0" cols="12" md="4">
            <h2 class="mb-2">{{ $tc('p.alias', 2) }}</h2>
            <v-chip v-for="alias of flow.aliases" :key="alias.name" small>{{ alias.name }}</v-chip>
            <v-spacer class="my-5"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-if="flow.attachments.length > 0" class="mb-5">
      <v-card-title>{{ $tc('p.attachment', 2) }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(attachment,i) in flow.attachments" :key="i" cols="12" md="6" lg="4">
            <embed-attachment :attachment="attachment"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="flow" :commentable-id="flow.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import BreadcrumbTitle from '~/components/breadcrumb-title.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, EmbedAttachment, BreadcrumbTitle},
})
export default class FlowDetailsPage extends Page {
  flow: any = null;

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const response = await this.$api.get(`/api/flows/${id}`);
      this.flow = response.data;
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
}
</script>
