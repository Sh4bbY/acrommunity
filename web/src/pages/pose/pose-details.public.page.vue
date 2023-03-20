<template>
  <v-container v-if="pose">
    <v-dialog v-model="dialog.show">
      <v-card>
        <v-img :src="dialog.url" :max-height="maxHeight" contain/>
      </v-card>
    </v-dialog>
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>
          <breadcrumb-title :title="pose.name" :parents="[{text: $tc('p.pose',2), to: {name: 'poses'}}]"/>
        </v-toolbar-title>
        <fav-button v-if="$store.state.auth.isSignedIn" :item="pose" :type="type" small/>
        <v-spacer/>
        <item-menu v-if="$store.state.auth.isSignedIn" :item="pose" :type="type"/>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col v-if="pose.description" cols="12">
            <h3 class="mb-2">{{ $t('field.description') }}</h3>
            <div v-html="pose.description"/>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-2">{{ $t('field.difficulty') }}</h3>
            <span>{{ pose.difficulty }} ({{ difficultyLabel }})</span>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-2">{{ $tc('p.person', 2) }}</h3>
            <span>{{ pose.persons }}</span>
          </v-col>

          <v-col cols="12" md="6">
            <h3 class="mb-2">{{ $t('field.basePosition') }}</h3>
            <span>{{ pose.basePosition ? $t('basePosition.' + pose.basePosition) : '-' }}</span>
          </v-col>

          <v-col cols="12" md="6">
            <h3 class="mb-2">{{ $t('field.flyerPosition') }}</h3>
            <span>{{ pose.flyerPosition ? $t('flyerPosition.' + pose.flyerPosition) : '-' }}</span>
          </v-col>

          <v-col cols="12" md="6" v-if="pose.easyIn">
            <v-checkbox v-model="pose.easyIn" :label="$t('field.easyIn')" class="mt-0" disabled hide-details/>
          </v-col>
          <v-col cols="12" md="6" v-if="pose.easyOut">
            <v-checkbox v-model="pose.easyOut" :label="$t('field.easyOut')" class="mt-0" disabled hide-details/>
          </v-col>
          <v-col cols="12" md="6" v-if="pose.counterBalance">
            <v-checkbox v-model="pose.counterBalance" :label="$t('field.counterbalance')" class="mt-0" disabled hide-details/>
          </v-col>

          <v-col v-if="pose.tags.length > 0" cols="12" md="6">
            <h3 class="mb-2">{{ $tc('p.tag', 2) }}</h3>
            <v-chip v-for="tag of pose.tags" :key="tag.name" small class="mr-1 mb-1">{{ tag.name }}</v-chip>
          </v-col>

          <v-col v-if="pose.aliases.length > 0" cols="12" md="6">
            <h3 class="mb-2">{{ $tc('p.alias', 2) }}</h3>
            <span>{{ pose.aliases.map(a => a.name).join(', ') }}</span>
          </v-col>
        </v-row>

        <h3 class="mt-4 mb-2">{{ $tc('p.image', 2) }}</h3>
        <div class="d-flex justify-start flex-wrap">
          <div v-for="(attachment,i) in pose.attachments" :key="i" style="border: 1px solid #cccccc" class="ma-1">
            <v-img :src="attachment.url" :max-height="200" :max-width="200" contain class="cursor-pointer" @click="dialog = {show: true, url: attachment.url}"/>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ $t('label.transitionFrom') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="source in sources" :key="'source-'+source.id">
            <div class="d-flex flex-column align-center">
              <v-img :src="source.attachments[0].url" max-height="150px" contain/>
              <router-link :to="{name: 'pose-details', params: {id: source.id}}">{{ source.name }}</router-link>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ $t('label.transitionTo') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="target in targets" :key="'target-'+target.id">
            <div class="d-flex flex-column align-center">
              <v-img :src="target.attachments[0].url" max-height="150px" contain/>
              <router-link :to="{name: 'pose-details', params: {id: target.id}}">{{ target.name }}</router-link>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="pose" :commentable-id="pose.id"/>
  </v-container>
</template>

<script lang="ts">
import {debounceTime, fromEvent} from 'rxjs';
import {Component, Watch} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';
import FavButton from '~/components/item/fav-button.vue';
import ItemMenu from '~/components/item/item-menu.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, TooltipButton, BreadcrumbTitle, ItemMenu, FavButton, EmbedAttachment},
})
export default class PoseDetailsPublicPage extends Page {
  pose: any = null;
  dialog = {show: false, url: null};
  sources: any = [];
  targets: any = [];

  subscription = null;
  maxHeight = window.innerHeight - 100;

  mounted() {
    this.subscription = fromEvent(window, 'resize').pipe(debounceTime(250)).subscribe(() => this.updateMaxHeight());
  }

  beforeDestroy() {
    this.subscription.unsubscribe();
  }

  updateMaxHeight() {
    this.maxHeight = window.innerHeight - 100;
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

  get difficultyLabel() {
    return resolveDifficulty(this.pose.difficulty, this);
  }

  get type() {
    return 'pose';
  }
}
</script>

<style lang="scss" scoped>
.close-btn {
  color: #000;
  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;
}
</style>
