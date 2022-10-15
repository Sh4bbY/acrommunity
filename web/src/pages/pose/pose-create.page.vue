<template>
  <v-container>
    <v-form>
      <v-card>
        <v-toolbar color="primary" dark dense>
          <v-toolbar-title>{{ $t('action.createItem', {item: $tc('p.pose')}) }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.name" :label="$t('field.name')"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-slider v-model="form.difficulty" :label="$t('field.difficulty')"/>
              {{ form.difficulty }}
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea v-model="form.description" :label="$t('field.description')"/>
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
            <v-col cols="12">
              <v-combobox v-model="form.aliases" chips deletable-chips multiple :label="$tc('p.alias', 2)"/>
            </v-col>
            <v-col cols="12">
              <v-combobox v-model="form.tags" chips deletable-chips multiple :label="$tc('p.tag', 2)"/>
            </v-col>
            <v-col cols="12">
              <h3>{{ $tc('p.attachment', 2) }}</h3>
              <v-text-field v-model="form.url" :label="$tc('p.url', 2)"/>
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
import {BasePosition} from '@acrommunity/common/enums/BasePosition';
import {FlyerPosition} from '@acrommunity/common/enums/FlyerPosition';
import {Component} from 'vue-property-decorator';
import Page from '../page.vue';

@Component({
  components: {},
})
export default class PoseCreatePage extends Page {
  form = {
    name: '',
    description: '',
    persons: 2,
    difficulty: 1,
    basePosition: null,
    flyerPosition: null,
    attachments: [],
  };

  get title() {
    return this.$t('action.createItem', {item: this.$tc('p.pose')});
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
