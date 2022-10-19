<template>
  <v-container v-if="skill">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ skill.name }}</v-toolbar-title>
        <v-spacer/>
        <v-btn v-if="skill.id > 1" icon :to="{name: 'skill-details', params: {id: skill.id - 1}}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :to="{name: 'skill-details', params: {id: skill.id + 1}}">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-img v-if="skill.attachments.length === 1" :src="skill.attachments[0].url" contain/>
            <v-carousel v-else-if="skill.attachments.length > 1" :show-arrows="skill.attachments.length > 1">
              <v-carousel-item v-for="(attachment,i) in skill.attachments" :key="i">
                <v-img :src="attachment.url" contain/>
              </v-carousel-item>
            </v-carousel>
            <div v-else>
              <v-alert color="grey" outlined class="text-center">no images</v-alert>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <h3 class="mb-2">{{ $t('field.description') }}</h3>
            <p>{{ skill.description }}</p>
            <v-spacer class="my-5"/>

            <v-row>
              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $t('field.difficulty') }}</h3>
                <p>{{ skill.difficulty }} ({{ difficultyLabel }})</p>
                <v-spacer class="my-5"/>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $tc('field.type') }}</h3>
                <p>{{ skill.type }}</p>
                <v-spacer class="my-5"/>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="mb-2">{{ $tc('p.person', 2) }}</h3>
                <p>{{ skill.persons }}</p>
                <v-spacer class="my-5"/>
              </v-col>

              <v-col cols="12" md="6">
                <div v-if="skill.tags.length > 0">
                  <h3 class="mb-2">{{ $tc('p.tag', 2) }}</h3>
                  <v-chip v-for="tag of skill.tags" :key="tag.name" small>{{ tag.name }}</v-chip>
                  <v-spacer class="my-5"/>
                </div>

                <div v-if="skill.aliases.length > 0">
                  <h3 class="mb-2">{{ $tc('p.alias', 2) }}</h3>
                  <v-chip v-for="alias of skill.aliases" :key="alias.name" small>{{ alias.name }}</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="skill" :commentable-id="skill.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel},
})
export default class SkillDetailsPage extends Page {
  skill: any = null;

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

  get difficultyLabel() {
    return resolveDifficulty(this.skill.difficulty, this);
  }
}
</script>
