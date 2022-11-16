<template>
  <v-container v-if="jam">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ jam.title }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h3>{{ $t('field.description') }}</h3>
            <p>{{ jam.description }}</p>
            <h3>Wann?</h3>
            <moment v-model="jam.startDate" format="dddd, DD.MM.yyyy - HH:mm"/>
            <v-spacer class="my-5"/>
            <h3>Bis?</h3>
            <moment v-model="jam.endDate" format="dddd, DD.MM.yyyy - HH:mm"/>
            Uhr
            <v-spacer class="my-5"/>
          </v-col>
        </v-row>
        <pre>{{ jam }}</pre>
      </v-card-text>
    </v-card>

    <comments-panel commentable-type="jam" :commentable-id="jam.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import Moment from '~/components/common/moment.vue';
import Page from '../page.vue';

@Component({
  components: {Moment, CommentsPanel},
})
export default class JamDetailsPage extends Page {
  jam: any = null;

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const response = await this.$api.get(`/api/jams/${id}`);
      this.jam = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.jam?.name || this.$tc('p.jam');
  }
}
</script>
