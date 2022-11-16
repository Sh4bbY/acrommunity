<template>
  <v-navigation-drawer class="app-navigation" v-model="isOpen" app clipped mobile-breakpoint="600" width="220">
    <v-list class="grow" dense>
      <template v-for="item in items">
        <v-list-group v-if="item.children" v-model="item.open" :key="item.title">
          <template #activator>
            <v-list-item-icon>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item v-for="child in item.children" :key="child.title" :to="child.route" :exact="child.exact" :ripple="child.ripple">
            <v-list-item dense>
              <v-list-item-icon>
                <v-icon v-if="child.icon">{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :key="item.title" :to="item.route" :exact="item.exact" :ripple="item.ripple">
          <v-list-item-icon>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-badge v-if="item.badge" class="badge" color="orange" :content="item.badge"/>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class AdminNavigation extends Vue {
  isGroupOpen = {
    dictionary: false,
    apps: false,
    events: false,
    admin: false,
  };

  mounted() {
    this.updateGroupOpenState();
  }

  updateGroupOpenState() {
    const path = window.location.pathname;
    if (this.startsWithAny(path, ['/poses', '/flows', '/skills', '/images', '/videos'])) {
      this.isGroupOpen.dictionary = true;
    }
    if (this.startsWithAny(path, ['/apps'])) {
      this.isGroupOpen.apps = true;
    }
    if (this.startsWithAny(path, ['/jams'])) {
      this.isGroupOpen.events = true;
    }
    if (this.startsWithAny(path, ['/admin'])) {
      this.isGroupOpen.admin = true;
    }
  }

  get items() {
    return [
      {title: this.$t('label.home'), icon: 'mdi-home', route: {name: 'home'}, exact: true},
      {
        title: this.$t('label.dictionary'), icon: 'mdi-book-open-variant', open: this.isGroupOpen.dictionary, children: [
          {title: this.$tc('p.pose', 2), icon: 'mdi-human', route: {name: 'poses'}, exact: false},
          {title: this.$tc('p.flow', 2), icon: 'mdi-spa', route: {name: 'flows'}, exact: false},
          {title: this.$tc('p.skill', 2), icon: 'mdi-magic-staff', route: {name: 'skills'}, exact: false},
          {title: this.$tc('p.image', 2), icon: 'mdi-image', route: {name: 'images'}, exact: false},
          {title: this.$tc('p.video', 2), icon: 'mdi-video', route: {name: 'videos'}, exact: false},
        ],
      },
      {
        title: this.$tc('p.app', 2), icon: 'mdi-leaf', open: this.isGroupOpen.apps, children: [
          {title: this.$t('label.flowGenerator'), icon: 'mdi-slot-machine', route: {name: 'flow-generator'}, exact: false},
          {title: this.$t('label.acrolette'), icon: 'mdi-gamepad-variant', route: {name: 'acrolette'}, exact: false},
          {title: this.$t('label.acroQuiz'), icon: 'mdi-help-circle', route: {name: 'acro-quiz'}, exact: false},
        ],
      },
      {
        title: this.$tc('p.event', 2), icon: 'mdi-calendar', open: this.isGroupOpen.events, children: [
          {title: this.$tc('p.jam', 2), icon: 'mdi-account-group', route: {name: 'jams'}, exact: false},
        ],
      },
      {
        title: this.$t('label.administration'), icon: 'mdi-security', open: this.isGroupOpen.admin, children: [
          {title: this.$tc('p.user', 2), icon: 'mdi-account-multiple', route: {name: 'users'}, exact: false},
          {title: this.$tc('p.comment', 2), icon: 'mdi-chat', route: {name: 'comments'}, exact: false},
          {title: 'Dev', icon: 'mdi-dev-to', route: {name: 'dev'}, exact: false},
        ],
      },
      {title: this.$tc('p.reference', 2), icon: 'mdi-web', route: {name: 'references'}, exact: false},
      {title: 'Communities', icon: 'mdi-account-group', route: {name: 'communities'}, exact: false},
    ];
  }

  startsWithAny(input: string, starts: string | string[]) {
    starts = Array.isArray(starts) ? starts : [starts];
    return starts.reduce((result, start) => result || input.startsWith(start), false);
  }

  get isOpen(): boolean {
    return this.$store.state.app.showNavigation;
  }

  set isOpen(value: boolean) {
    this.$store.dispatch('app/setNavigation', value);
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/colors";

.app-navigation::v-deep .v-list-item--active:not(.v-list-group__header) {
  background-color: $c-background;
  color: rgba(#fff, 0.9);

  & > .v-list-item {
    color: rgba(#fff, 0.9) !important;
  }

  .v-icon {
    color: $c-primary;
  }
}

.badge {
  margin-top: 10px;
  margin-right: 10px;
}

.app-navigation ::v-deep .v-list-item__icon:first-child {
  margin-right: 16px;
}
</style>
