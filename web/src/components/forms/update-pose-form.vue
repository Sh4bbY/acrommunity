<template>
  <v-form>
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>{{ $t('action.editItem', {item: $tc('p.pose')}) }}</v-toolbar-title>
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
            <v-select v-model="form.persons" :items="personOptions" :label="$tc('p.person', 2)"/>
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
            <v-combobox v-model="form.aliases" item-text="name" item-value="id" chips deletable-chips multiple :label="$tc('p.alias', 2)"/>
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="form.tags" item-text="name" item-value="id" chips deletable-chips multiple :label="$tc('p.tag', 2)"/>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete v-model="form.transitionTargets" :items="transitionTargets" chips deletable-chips multiple :label="$tc('p.transition', 2)"/>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center">
              <h3>{{ $tc('p.attachment', 2) }}</h3>
              <v-btn icon class="ml-2" @click="addAttachment">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div v-for="(attachment,idx) in form.attachments" :key="'pose-' + idx" class="d-flex align-center">
              <v-text-field v-model="attachment.url" :label="$tc('field.url', 2)"/>
              <v-btn icon class="ml-2" @click="removeAttachment(idx)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$router.go(-1)">{{ $t('action.cancel') }}</v-btn>
        <v-spacer/>
        <v-btn text :disabled="!hasChanged" @click="reset">{{ $t('action.reset') }}</v-btn>
        <v-btn color="primary" :disabled="!hasChanged" @click="submit">{{ $t('action.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">

import {BasePosition, FlyerPosition, IPose} from '@acrommunity/common';
import Vue from 'vue';
import {Component, VModel, Watch} from 'vue-property-decorator';

@Component
export default class UpdatePoseForm extends Vue {
  @VModel() pose: IPose;

  poseOptions = [];
  form = {
    name: '',
    difficulty: 1,
    description: '',
    persons: 2,
    basePosition: null,
    flyerPosition: null,
    aliases: [],
    tags: [],
    attachments: [],
    transitionTargets: [],
  };

  async mounted() {
    try {
      const response = await this.$api.get('/api/poses/options');
      this.poseOptions = response.data;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  @Watch('pose', {immediate: true})
  watchPose() {
    this.reset();
  }

  reset() {
    if (this.pose) {
      Object.keys(this.form).forEach(key => this.form[key] = this.pose[key]);
    }
  }


  get transitionTargets() {
    return this.poseOptions.map(pose => ({text: pose.name, value: pose.id}));
  }

  get flyerPositions() {
    return Object.values(FlyerPosition).map(value => ({text: this.$t('flyerPosition.' + value), value}));
  }

  get basePositions() {
    return Object.values(BasePosition).map(value => ({text: this.$t('basePosition.' + value), value}));
  }

  get personOptions() {
    return [
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

  get hasChanged() {
    return Object.keys(this.form).reduce((hasChanged, key) => hasChanged || this.form[key] !== this.pose, false);
  }

  async submit() {
    try {
      const response = await this.$api.put('/api/poses/' + this.pose.id, this.form);
      console.log(response.data);
      this.$notify.success('yay');
      await this.$router.push({name: 'pose-details', params: {id: String(this.pose.id)}});
    } catch (e) {
      this.$notify.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
