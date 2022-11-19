<template>
  <div>
    <v-card class="mb-5">
      <v-toolbar color="primary lighten-1" dark dense>
        <v-toolbar-title>
          <span class="pt-2">{{ title }}</span>
        </v-toolbar-title>
        <v-spacer/>
      </v-toolbar>
      <v-card-text v-if="markables.length === 0">
        <span v-if="type === MarkType.Favorite">{{ $t('msg.noFavorites') }}</span>
        <span v-else-if="type === MarkType.CanDo">{{ $t('msg.yourItemIsEmpty', {item: $tc('p.repertoire')}) }}</span>
        <span v-else-if="type === MarkType.WorkingOn">{{ $t('msg.yourItemIsEmpty', {item: $tc('p.trainingPlan')}) }}</span>
      </v-card-text>
      <v-card-text v-else v-for="markable in markables" :key="markable.type">
        <h2 class="py-2 text-center">{{ $tc('p.' + markable.type, 2) }}</h2>
        <v-divider class="mb-3"/>
        <v-row>
          <v-col v-for="item in markable.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-sheet outlined rounded class="pa-2 text-center">
              <router-link :to="{name: markable.type + '-details', params: {id: item.id}}">{{ item.name }}</router-link>
              <embed-attachment :attachment="item.attachments[0]"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {MarkableType, MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {TooltipButton, EmbedAttachment},
})
export default class MyMarks extends Vue {
  @Prop() type: MarkType;
  @Prop() title: string;

  marks: any = {
    poses: [],
    flows: [],
    skills: [],
  };

  get markables() {
    return [
      {type: MarkableType.Pose, items: this.marks.poses},
      {type: MarkableType.Flow, items: this.marks.flows},
      {type: MarkableType.Skill, items: this.marks.skills},
    ].filter(markable => markable.items.length > 0);
  }

  async mounted() {
    try {
      const response = await this.$api.get('/api/my/marks/' + this.type);
      this.marks = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get MarkType() {
    return MarkType;
  }
}
</script>

<style lang="scss" scoped>
</style>
