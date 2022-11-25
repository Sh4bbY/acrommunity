<template>
  <v-container>
    <v-card v-if="feedback">
      <v-toolbar color="primary" dark dense>
        <v-toolbar-items class="mr-2">
          <v-btn text :to="{name: 'user-details', params: {id: feedback.authorId}}">
            <v-avatar size="25" class="mr-2">
              <v-img :src="feedback.author.avatar"/>
            </v-avatar>
            <span>{{ feedback.author.username }}</span>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-title>{{ feedback.title }}</v-toolbar-title>
        <v-spacer/>
        <moment v-model="feedback.createdAt"/>
      </v-toolbar>

      <v-card-text>
        <div v-html="feedback.text"/>
      </v-card-text>

      <v-card-actions class="d-flex align-center">
        <v-select v-model="feedback.status" :items="feedbackStatuses" :label="$t('field.status')" hide-details class="status mr-3"/>
        <v-spacer/>
        <v-btn color="primary" @click="sendMail">{{ $t('action.answerByMail') }}</v-btn>
      </v-card-actions>
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
export default class FeedbackDetailsPage extends Page {
  feedback = null;

  async mounted() {
    try {
      const response = await this.$api.get('/api/feedback/' + this.$route.params.id);
      this.feedback = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.$t('label.feedback') + ': ' + this.feedback?.title;
  }

  sendMail() {
    const subject = `Re: ${this.feedback.title}`;
    window.location.assign(`mailto:${this.feedback.author.email}?subject=${subject}`);
  }

  get feedbackStatuses() {
    return ['new', 'processed'];
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
