<template>
  <v-container>
    <v-form>
      <v-card>
        <v-toolbar color="primary" dark dense>
          <breadcrumb-title :title="$t('action.createItem', {item: $tc('p.pose')})" type="pose"/>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.name" :label="$t('field.name')"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-slider v-model="form.difficulty" :label="$t('field.difficulty')" max="10"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea v-model="form.description" :label="$t('field.description')" rows="3" auto-grow/>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.persons" :items="personOption" :label="$tc('p.person', 2)"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.basePosition" :label="$t('field.basePosition')" :items="basePositions" clearable/>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.flyerPosition" :label="$t('field.flyerPosition')" :items="flyerPositions" clearable/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete v-model="form.transitionTargets" :items="transitionTargets" chips deletable-chips multiple :label="$tc('p.transition', 2)"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox v-model="form.aliases" chips deletable-chips multiple :label="$tc('p.alias', 2)"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox v-model="form.tags" chips deletable-chips multiple :label="$tc('p.tag', 2)"/>
            </v-col>
            <v-col cols="12">
              <h3>{{ $tc('p.attachment', 2) }}</h3>
              <div v-for="(attachment,idx) in form.attachments" :key="'pose-' + idx" class="d-flex align-center">
                <v-text-field v-model="attachment.url" :label="$tc('field.url', 2)" placeholder="Youtube, Instagram oder Image URL"/>
                <v-btn v-if="idx>0" icon class="ml-2" @click="removeAttachment(idx)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </div>
              <v-btn icon @click="addAttachment">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="submit">{{ $t('action.createItem', {item: $tc('p.pose')}) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {BasePosition, FlyerPosition} from '@acrommunity/common';
import {Component} from 'vue-property-decorator';
import BreadcrumbTitle from '~/components/breadcrumb-title.vue';
import Page from '../page.vue';

@Component({
  components: {BreadcrumbTitle},
})
export default class PoseCreatePage extends Page {
  form = {
    name: 'High Throne',
    description: 'a throne high up in the sky',
    persons: 2,
    difficulty: 8,
    basePosition: BasePosition.STANDING,
    flyerPosition: null,
    transitionTargets: [],
    tags: [],
    aliases: [],
    attachments: [
      {url: 'https://www.acromuseum.com/in/ph/2/full/85079791_925760664522864_6265427718827073915_n.jpg'},
    ],
  };
  poseOptions = [];

  async mounted() {
    try {
      const response = await this.$api.get('/api/poses/options');
      this.poseOptions = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.$t('action.createItem', {item: this.$tc('p.pose')});
  }

  get transitionTargets() {
    return this.poseOptions.map(pose => ({text: pose.name, value: pose.id}));
  }

  get basePositions() {
    return Object.values(BasePosition).map(position => ({text: this.$t('basePosition.' + position), value: position}));
  }

  get flyerPositions() {
    return Object.values(FlyerPosition).map(position => ({text: this.$t('flyerPosition.' + position), value: position}));
  }

  get personOption() {
    return [
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '4', value: 4},
      {text: '5 oder mehr', value: 5},
    ];
  }

  addAttachment() {
    this.form.attachments.push({url: ''});
  }

  removeAttachment(idx: number) {
    this.form.attachments.splice(idx, 1);
  }

  async submit() {
    try {
      const response = await this.$api.post('/api/poses', this.form);
      console.log(response.data);
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>
