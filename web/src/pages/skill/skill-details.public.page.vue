<template>
  <v-container v-if="skill">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <breadcrumb-title :title="skill.name" :parents="[{text: $tc('p.skill', 2), to: {name: 'skills'}}]"/>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col v-if="skill.description" cols="12">
            <h3 class="mb-2">{{ $t('field.description') }}</h3>
            <p>{{ skill.description }}</p>
            <v-spacer class="my-5"/>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <h3 class="mb-2">{{ $t('field.difficulty') }}</h3>
            <p>{{ difficultyLabel }}</p>
            <v-spacer class="my-5"/>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <h3 class="mb-2">{{ $tc('field.type') }}</h3>
            <p>{{ $t('skillType.' + skill.type) }}</p>
            <v-spacer class="my-5"/>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <h3 class="mb-2">{{ $tc('p.person', 2) }}</h3>
            <p>{{ skill.persons }}</p>
            <v-spacer class="my-5"/>
          </v-col>

          <v-col cols="12" sm="6">
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
      </v-card-text>
    </v-card>


    <v-row>
      <v-col v-for="(attachment,i) in skill.attachments" :key="i" cols="12" md="6" lg="4">
        <embed-attachment :attachment="attachment"/>
      </v-col>
    </v-row>

    <v-spacer class="my-5"/>
    <comments-panel commentable-type="skill" :commentable-id="skill.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import BreadcrumbTitle from '~/components/common/breadcrumb-title.vue';
import {resolveDifficulty} from '~/utils';
import Page from '../page.vue';

@Component({
  components: {CommentsPanel, EmbedAttachment, BreadcrumbTitle},
})
export default class SkillDetailsPublicPage extends Page {
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
