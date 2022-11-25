<template>
  <v-container>
    <v-card v-if="comment">
      <v-toolbar color="primary" dark dense>
        <v-toolbar-items class="mr-2">
          <v-btn text :to="{name: 'user-details', params: {id: comment.authorId}}">
            <v-avatar size="25" class="mr-2">
              <v-img :src="comment.author.avatar"/>
            </v-avatar>
            <span>{{ comment.author.username }}</span>
          </v-btn>
          <v-btn text :to="{name: comment.commentableType+'-details', params: {id: comment.commentableId}}">
            {{ comment.commentableType }} {{ comment.commentableId }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer/>
        <moment v-model="comment.createdAt"/>
      </v-toolbar>

      <v-card-text>
        <div v-html="comment.text"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Moment from '~/components/common/moment.vue';
import Page from '../page.vue';

@Component({
  components: {Moment},
})
export default class CommentDetailsPage extends Page {
  comment = null;

  async mounted() {
    try {
      const response = await this.$api.get('/api/comments/' + this.$route.params.id);
      this.comment = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.$t('label.comment') + ': ' + this.comment?.title;
  }
}
</script>

<style lang="scss" scoped>
.author-link {
  color: #fff;
  margin-right: 20px;
  text-shadow: 0 1px 2px rgb(0 0 0);
}

.status {
  max-width: 100px;
}
</style>
