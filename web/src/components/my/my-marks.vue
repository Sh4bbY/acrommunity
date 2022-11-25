<template>
  <div>
    <media-dialog v-model="dialog.show" :item="dialog.item" :type="dialog.type" :fullscreen="$vuetify.breakpoint.xs" :is-first="dialog.isFirst" :is-last="dialog.isLast"
                  @next="loadNext"
                  @prev="loadPrev"/>
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
            <v-sheet v-if="isImageOrVideo(markable.type)" outlined rounded class="pa-2 cursor-pointer" @click="showDialog(item, markable.type)">
              <v-img v-if="MarkableType.Image === markable.type" :src="item.url" width="100%" height="200px"/>
              <v-img v-else-if="MarkableType.Video === markable.type" :src="item.thumbnail" width="100%" height="200px"/>
            </v-sheet>
            <v-sheet v-else outlined rounded class="pa-2 text-center">
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
import MediaDialog from '~/components/dialogs/media-dialog.vue';

@Component({
  components: {TooltipButton, EmbedAttachment, MediaDialog},
})
export default class MyMarks extends Vue {
  @Prop() type: MarkType;
  @Prop() title: string;
  marks: any = {
    poses: [],
    flows: [],
    skills: [],
    images: [],
    videos: [],
  };
  dialog = {
    type: null,
    show: false,
    item: null,
    isFirst: false,
    isLast: false,
  };

  showDialog(item, type) {
    const items = type === MarkableType.Image ? this.marks.images : this.marks.videos;
    const idx = items.findIndex(v => v.id === item.id);
    this.dialog = {
      show: true,
      type,
      item,
      isFirst: idx === 0,
      isLast: idx === items.length - 1,
    };
  }

  loadNext() {
    const items = this.dialog.type === MarkableType.Image ? this.marks.images : this.marks.videos;
    const idx = items.findIndex(v => v.id === this.dialog.item.id);
    if (idx + 1 < items.length) {
      this.dialog.item = items[idx + 1];
    }
    this.dialog.isFirst = false;
    this.dialog.isLast = idx + 1 === items.length - 1;
  }

  loadPrev() {
    const items = this.dialog.type === MarkableType.Image ? this.marks.images : this.marks.videos;
    const idx = items.findIndex(v => v.id === this.dialog.item.id);
    if (idx - 1 >= 0) {
      this.dialog.item = items[idx - 1];
    }
    this.dialog.isFirst = idx - 1 === 0;
    this.dialog.isLast = false;
  }


  get markables() {
    return [
      {type: MarkableType.Pose, items: this.marks.poses},
      {type: MarkableType.Flow, items: this.marks.flows},
      {type: MarkableType.Skill, items: this.marks.skills},
      {type: MarkableType.Image, items: this.marks.images},
      {type: MarkableType.Video, items: this.marks.videos},
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

  get MarkableType() {
    return MarkableType;
  }

  isImageOrVideo(markableType) {
    return MarkableType.Image === markableType || MarkableType.Video === markableType;
  }
}
</script>

<style lang="scss" scoped>
</style>
