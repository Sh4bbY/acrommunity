<template>
  <v-menu bottom offset-y transition="scale-transition" origin="top center" tile>
    <template #activator="{ on, attrs }">
      <v-btn text v-on="on" v-bind="attrs">
        <v-avatar v-if="user.avatar" size="28" :style="avatarStyle">
          <v-img alt="Avatar" :src="user.avatar"/>
        </v-avatar>
        <v-icon v-else :left="$vuetify.breakpoint.smAndUp">mdi-account</v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">{{ user.username }}</span>
      </v-btn>
    </template>
    <v-list class="py-0">
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.to" v-on="item.onClick ? {click: item.onClick} : {}">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class UserMenu extends Vue {
  get user() {
    return this.$store.state.auth.user;
  }

  get avatarStyle() {
    return this.$vuetify.breakpoint.smAndUp ? {marginLeft: '-4px', marginRight: '8px'} : {};
  }

  get items() {
    return [
      {
        icon: 'mdi-account',
        title: this.$tc('p.profile'),
        to: {name: 'profile'},
      },
      {
        icon: 'mdi-format-list-bulleted ',
        title: this.$tc('label.myLists'),
        to: {name: 'my-lists'},
      },
      {
        icon: 'mdi-bookmark-multiple ',
        title: this.$tc('label.myMarks'),
        to: {name: 'my-marks'},
      },
      {
        icon: 'mdi-calendar ',
        title: this.$tc('label.myJams'),
        to: {name: 'my-jams'},
        condition: this.$store.state.user.jams.length > 0,
      },
      {
        icon: 'mdi-power',
        title: this.$t('action.logout'),
        onClick: async () => {
          await this.$store.dispatch('auth/logout');
        },
      },
    ].filter(item => item.condition === undefined || item.condition === true);
  }
}
</script>


<style lang="scss" scoped>
.user-menu {

}
</style>
