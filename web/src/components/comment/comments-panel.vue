<template>
  <div>
    <comment-form v-if="flag.write" :commentable-type="commentableType" :commentable-id="commentableId" cancel @success="onCommentSuccess" @cancel="flag.write = false"/>
    <v-btn v-else-if="$store.state.auth.isSignedIn" outlined @click="flag.write = true">{{ $t('action.writeItem', {item: $tc('p.comment')}) }}</v-btn>
    <v-btn v-else outlined disabled class="break">{{ $t('msg.mustBeSignedInToComment') }}</v-btn>

    <comments :commentable-type="commentableType" :commentable-id="commentableId" :new-comment="newComment"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import CommentForm from '~/components/comment/comment-form.vue';
import Comments from '~/components/comment/comments.vue';

@Component({
  components: {Comments, CommentForm},
})
export default class CommentsPanel extends Vue {
  @Prop({required: true}) commentableType: string;
  @Prop({required: true}) commentableId: string;

  flag = {
    write: false,
  };

  newComment = null;

  onCommentSuccess(comment) {
    this.newComment = {...comment, author: this.$store.state.auth.user};
  }
}
</script>
