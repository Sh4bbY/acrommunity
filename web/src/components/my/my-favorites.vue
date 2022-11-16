<template>
  <div>
    <v-card class="mb-5">
      <v-toolbar color="primary lighten-1" dark dense>
        <v-icon class="mr-2">mdi-heart</v-icon>
        <v-toolbar-title>{{ $tc('p.my', 2) }} {{ $tc('p.favorite', 2) }}</v-toolbar-title>
        <v-spacer/>
      </v-toolbar>
      <v-card-text v-if="markables.length === 0">
        {{ $t('msg.noFavorites') }}
      </v-card-text>
      <v-card-text v-else v-for="markable in markables" :key="markable.type">
        <v-card>
          <v-card-title>
            <span>{{ $tc('p.' + markable.type, 2) }}</span>
            <v-spacer/>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="item in markable.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                <v-sheet outlined rounded class="pa-2">
                  <h2>{{ item.name }}</h2>
                  <embed-attachment :attachment="item.attachments[0]"/>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {MarkableType, MarkType} from '@acrommunity/common';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import EmbedAttachment from '~/components/attachment/embed-attachment.vue';
import TooltipButton from '~/components/common/tooltip-button.vue';

@Component({
  components: {TooltipButton, EmbedAttachment},
})
export default class MyFavorites extends Vue {
  favorites: any = {
    poses: [],
    flows: [],
    skills: [],
  };

  get markables() {
    return [
      {type: MarkableType.Pose, items: this.favorites.poses},
      {type: MarkableType.Flow, items: this.favorites.flows},
      {type: MarkableType.Skill, items: this.favorites.skills},
    ].filter(listable => listable.items.length > 0);
  }

  async mounted() {
    try {
      const response = await this.$api.get('/api/my/marks/' + MarkType.Favorite);
      this.favorites = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  // get favorites() {
  //   return this.$store.state.user.marks.filter(mark => mark.type === MarkType.Favorite);
  // }
}
</script>

<style lang="scss" scoped>
</style>
