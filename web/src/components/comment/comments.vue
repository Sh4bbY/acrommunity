<template>
  <div>
    <div v-if="count > 0">
      <h2 class="mt-4">{{ $tc('p.comment', 2) }} ({{ count }})</h2>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.id" class="list-item elevation-1 mb-1" :class="item.type">
          <v-list-item-avatar v-if="item.author">
            <v-img :src="item.author.avatar" class="comment-avatar"/>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <router-link v-if="item.author" :to="{name: 'user-details', params: {id: item.authorId}}">{{ item.author.username }}</router-link>
              <router-link v-else :to="{name: 'user-details', params: {id: item.authorId}}">User {{ item.authorId }}</router-link>
            </v-list-item-title>

            <v-list-item-subtitle>
              <moment v-model="item.createdAt"/>
            </v-list-item-subtitle>

            <p class="text" v-html="item.text"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import CommentForm from '~/components/comment/comment-form.vue';
import Moment from '~/components/moment.vue';

@Component({
  components: {CommentForm, Moment},
})
export default class Comments extends Vue {
  @Prop({required: true}) commentableType: string;
  @Prop({default: null}) commentableId: string;
  @Prop({default: null}) newComment: any;

  items = [];

  onCommentSuccess(comment) {
    this.items.unshift({...comment, author: this.$store.state.auth.user});
  }

  @Watch('commentableId', {immediate: true})
  async watchCommentableId() {
    const response = await this.$api.get(`/api/comments/${this.commentableType}/${this.commentableId}`);
    this.items = response.data;
  }

  @Watch('newComment')
  async watchNewComment(newComment: any) {
    this.items.unshift(newComment);
  }

  get count() {
    return this.items.length;
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/global";

.text {
  margin-top: 12px;
  color: #555;
}

.v-avatar.v-list-item__avatar {
  align-self: baseline;
}

.list-item {
  background-color: rgba(#999, 0.1);
  border: 1px solid rgba(#999, 0.2);
  border-radius: 8px;
  margin-bottom: 12px !important;
}

</style>
