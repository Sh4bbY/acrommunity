<template>
  <v-container v-if="pose">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>
          <breadcrumb-title :item="pose" :type="type"/>
        </v-toolbar-title>
        <fav-button :item="pose" :type="type"/>
        <v-spacer/>
        <tooltip-button icon="mdi-pencil" :tooltip="$t('action.editItem', {item: $tc('p.pose')})" :to="{name: 'pose-edit', params: {id: pose.id}}"/>
        <v-btn v-if="pose.id > 1" icon :to="{name: 'pose-details', params: {id: pose.id - 1}}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :to="{name: 'pose-details', params: {id: pose.id + 1}}">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <item-menu :item="pose" :type="type"/>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <embed-attachment v-if="pose.attachments.length === 1" :attachment="pose.attachments[0]"/>
            <v-carousel v-else-if="pose.attachments.length > 1" :show-arrows="pose.attachments.length > 1">
              <v-carousel-item v-for="(attachment,i) in pose.attachments" :key="i">
                <embed-attachment :attachment="attachment"/>
              </v-carousel-item>
            </v-carousel>
            <div v-else>
              <v-alert color="grey" outlined class="text-center">no images</v-alert>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <h3 class="mb-2">{{ $t('field.description') }}</h3>
            <p>{{ pose.description }}</p>
            <v-spacer class="my-5"/>

            <v-row>
              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $t('field.difficulty') }}</h3>
                <p>{{ pose.difficulty }} ({{ difficultyLabel }})</p>
                <v-spacer class="my-5"/>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $tc('p.person', 2) }}</h3>
                <p>{{ pose.persons }}</p>
                <v-spacer class="my-5"/>
              </v-col>

              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $t('field.basePosition') }}</h3>
                <p>{{ pose.basePosition ? $t('basePosition.' + pose.basePosition) : '-' }}</p>
                <v-spacer class="my-5"/>
              </v-col>

              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $t('field.flyerPosition') }}</h3>
                <p>{{ pose.flyerPosition ? $t('flyerPosition.' + pose.flyerPosition) : '-' }}</p>
                <v-spacer class="my-5"/>
              </v-col>

              <v-col cols="12" md="6">
                <div v-if="targets.length > 0">
                  <h3 class="mb-2">{{ $t('label.transitionTo') }}</h3>
                  <ul>
                    <li v-for="target in targets" :key="'target-'+target.id">
                      <router-link :to="{name: 'pose-details', params: {id: target.id}}">{{ target.name }}</router-link>
                    </li>
                  </ul>
                  <v-spacer class="my-5"/>
                </div>

                <div v-if="pose.tags.length > 0">
                  <h3 class="mb-2">{{ $tc('p.tag', 2) }}</h3>
                  <v-chip v-for="tag of pose.tags" :key="tag.name" small>{{ tag.name }}</v-chip>
                  <v-spacer class="my-5"/>
                </div>

                <div v-if="pose.aliases.length > 0">
                  <h3 class="mb-2">{{ $tc('p.alias', 2) }}</h3>
                  <v-chip v-for="alias of pose.aliases" :key="alias.name" small>{{ alias.name }}</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="pose" :commentable-id="pose.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import BreadcrumbTitle from '~/components/breadcrumb-title.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import TooltipButton from '~/components/tooltip-button.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, TooltipButton, BreadcrumbTitle, ItemMenu, FavButton, EmbedAttachment},
})
export default class PoseDetailsPage extends Page {
  pose: any = null;
  targets: any = [];
  sources: any = [];

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const [response, responseT] = await Promise.all([
        this.$api.get(`/api/poses/${id}`),
        this.$api.get(`/api/poses/${id}/transitions`),
      ]);
      this.pose = response.data;
      this.targets = responseT.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.pose?.name || this.$tc('p.pose') + ' ID:' + this.$route.params.id;
  }

  get difficultyLabel() {
    return resolveDifficulty(this.pose.difficulty, this);
  }

  get type() {
    return 'pose';
  }
}
</script>

<style lang="scss" scoped>
</style>
