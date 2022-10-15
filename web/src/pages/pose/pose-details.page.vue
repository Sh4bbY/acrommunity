<template>
  <v-container v-if="pose">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ pose.name }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel v-if="pose.attachments.length > 0" :show-arrows="pose.attachments.length > 1">
              <v-carousel-item v-for="(attachment,i) in pose.attachments" :key="i" :src="attachment.url">
                {{ attachment.name }}
              </v-carousel-item>
            </v-carousel>
            <div v-else>
              <v-alert color="grey" outlined class="text-center">no images</v-alert>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="mb-2">{{ $t('field.description') }}</h2>
            <p>{{ pose.description }}</p>
            <v-spacer class="my-5"/>

            <h2 class="mb-2">{{ $t('label.transitionTo') }}</h2>
            <ul>
              <li v-for="target in targets" :key="'target-'+target.id">
                <router-link :to="{name: 'pose-details', params: {id: target.id}}">{{ target.name }}</router-link>
              </li>
            </ul>
            <v-spacer class="my-5"/>

            <h2 class="mb-2">{{ $tc('p.tag', 2) }}</h2>
            <v-chip v-for="tag of pose.tags" small>{{ tag.name }}</v-chip>
            <v-spacer class="my-5"/>

            <h2 class="mb-2">{{ $tc('p.alias', 2) }}</h2>
            <v-chip v-for="alias of pose.aliases" small>{{ alias.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="pose" :commentable-id="pose.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel},
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
    return 'Pose Page';
  }
}
</script>
