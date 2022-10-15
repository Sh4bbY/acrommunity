<template>
  <v-container v-if="flow">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ flow.name }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel v-if="flow.attachments.length > 0" :show-arrows="flow.attachments.length > 1">
              <v-carousel-item v-for="(attachment,i) in flow.attachments" :key="i">
                <template v-if="attachment.type === 'youtube'">
                  <iframe width="100%" height="90%" :src="attachment.url" title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </template>
                <v-img contain :src="attachment.url" max-height="400px"/>
              </v-carousel-item>
            </v-carousel>
            <div v-else>
              <v-alert color="grey" outlined class="text-center">no images</v-alert>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="mb-2">{{ $t('field.description') }}</h2>
            <p>{{ flow.description }}</p>
            <v-spacer class="my-5"/>

            <h2 class="mb-2">{{ $tc('p.tag', 2) }}</h2>
            <v-chip v-for="tag of flow.tags" :key="tag.name" small>{{ tag.name }}</v-chip>
            <v-spacer class="my-5"/>

            <h2 class="mb-2">{{ $tc('p.alias', 2) }}</h2>
            <v-chip v-for="alias of flow.aliases" :key="alias.name" small>{{ alias.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="flow" :commentable-id="flow.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel},
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
}
</script>
