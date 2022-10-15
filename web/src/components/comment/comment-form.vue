<template>
  <v-form v-model="isValid" ref="form" @submit.prevent="submit">
    <v-textarea v-model="form.text" class="pt-1" :label="$tc('p.comment')" auto-grow outlined rows="1" row-height="15" @keydown.ctrl.enter="submit()"/>
    <div class="d-flex">
      <v-spacer/>
      <v-btn v-if="cancel" text class="mr-3" @click="$emit('cancel')">{{ $t('action.cancel') }}</v-btn>
      <v-btn color="primary" :disabled="!isValid" type="submit">{{ $t('action.submit') }}</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class CommentForm extends Vue {
  @Prop({type: Boolean, default: false}) cancel: boolean;
  @Prop() commentableType: string;
  @Prop() commentableId: string;

  form = {};
  isValid = true;

  async submit() {
    try {
      const payload = Object.assign({}, this.form, {
        commentableType: this.commentableType,
        commentableId: this.commentableId,
      });
      const response = await this.$api.post('/api/comments', payload);
      this.$emit('success', response.data);
      this.$notify.success(this.$t('notify.createItemSuccess', {item: this.$tc(`p.comment`)}));
      this.reset();
    } catch (err) {
      this.$notify.error(err);
      this.$emit('error', err);
    }
  }

  get model() {
    return Comment;
  }

  reset() {
    (this.$refs.form as any).reset();
  }
}
</script>
