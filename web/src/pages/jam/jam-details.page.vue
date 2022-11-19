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
          <v-col cols="12" md="6">
            <h3>{{ $t('label.host') }}</h3>
            <router-link :to="{name: 'user-details', params: {id: jam.creator.id}}">
              <v-avatar size="26">
                <v-img :src="jam.creator.avatar"/>
              </v-avatar>
              {{ jam.creator.username }}
            </router-link>
            <v-spacer class="my-5"/>
            <h3>{{ $t('field.description') }}</h3>
            <p>{{ jam.description }}</p>
            <v-spacer class="my-5"/>
            <h3>Wann?</h3>
            {{ $t('recursionType.' + jam.recursionType) }}:
            <moment v-model="jam.startDate" format="dddd, DD.MM.yyyy - HH:mm"/>
            Uhr
            <v-spacer class="my-5"/>
            <h3>Bis?</h3>
            <moment v-model="jam.endDate" format="dddd, DD.MM.yyyy - HH:mm"/>
            Uhr
            <v-spacer class="my-5"/>
            <h3>{{ $tc('p.address') }}:</h3>
            <p>{{ jam.address }}</p>
            <v-spacer class="my-5"/>
            <h3>{{ $t('label.additionalInfo') }}:</h3>
            <p>{{ jam.locationInfo }}</p>
            <v-spacer class="my-5"/>
            <h3>{{ $t('label.contact') }}:</h3>
            <p class="mb-0">{{ jam.contact }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <leaflet-show-position :position="jam.latlng.coordinates"/>
            <div class="d-flex mt-2">
              <v-spacer/>
              <v-btn @click="openInMaps" small>Open in Google Maps</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="d-flex">
        <v-spacer/>
        <span class="text-note mr-3">{{ $t('label.lastUpdated') }}: <moment v-model="jam.updatedAt" humanize/></span>
      </div>
    </v-card>

    <comments-panel commentable-type="jam" :commentable-id="jam.id"/>
  </v-container>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import CommentsPanel from '~/components/comment/comments-panel.vue';
import Moment from '~/components/common/moment.vue';
import LeafletShowPosition from '~/components/leaflet/leaflet-show-position.vue';
import Page from '../page.vue';

@Component({
  components: {Moment, CommentsPanel, LeafletShowPosition},
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

  openInMaps() {
    const url = `https://www.google.com/maps/place/${this.jam.latlng.coordinates[0]},${this.jam.latlng.coordinates[1]}`;
    window.open(url, '_blank');
  }
}
</script>
