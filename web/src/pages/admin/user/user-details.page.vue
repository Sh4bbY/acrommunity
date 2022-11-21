<template>
  <v-container v-if="user">
    <v-card class="mb-5">
      <v-toolbar color="primary" dense dark>
        <v-toolbar-title>{{ user.username }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-img :src="user.avatar" max-width="200px" max-height="200px" contain/>
          </v-col>
          <v-col cols="12" md="6">
            <h3>{{ $t('field.email') }}</h3>
            <span>{{ user.email }}</span>
            <v-spacer class="my-5"/>
            <h3>{{ $t('field.strategy') }}</h3>
            <span>{{ user.strategy }}</span>
            <v-spacer class="my-5"/>
            <h3>{{ $t('field.createdAt') }}</h3>
            <moment v-model="user.createdAt"/>
            <v-spacer class="my-5"/>
            <v-checkbox v-model="isAdmin" :label="$t('field.isAdmin')" @change="toggleAdminRole"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <h2 class="mb-4">{{ $tc('p.list', 2) }}:</h2>
    <v-card v-for="list in user.lists" :key="list.id" class="mb-5">
      <v-toolbar color="primary" dark dense>
        <v-icon class="mr-2">{{ list.icon || 'mdi-view-list' }}</v-icon>
        <v-toolbar-title>{{ list.name }}</v-toolbar-title>
      </v-toolbar>

      <p v-if="list.description">{{ list.description }}</p>

      <v-card-text>
        <v-row>
          <v-col v-for="listable in getListables(list)" :key="listable.name" cols="12" md="4">
            <v-card>
              <v-card-title>{{ $tc('p.' + listable.name, 2) }}</v-card-title>
              <v-list dense>
                <v-list-item v-for="item in listable.items" :key="item.id">
                  <router-link :to="{name: listable.name + '-details', params: {id: item.id}}">{{ item.name }}</router-link>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Role} from '@acrommunity/common';
import {Component, Watch} from 'vue-property-decorator';
import Moment from '~/components/common/moment.vue';
import Page from '../../page.vue';

@Component({
  components: {Moment},
})
export default class UserDetailsPage extends Page {
  user: any = null;
  isAdmin = false;

  @Watch('$route.params.id', {immediate: true})
  async watchId(id: string) {
    try {
      const response = await this.$api.get(`/api/users/${id}`);
      this.user = response.data;
      this.isAdmin = this.user.role === Role.Admin;
    } catch (e) {
      this.$notify.error(e);
    }
  }

  async toggleAdminRole() {
    try {
      await this.$api.put(`/api/admin/user/${this.user.id}`, {role: this.isAdmin ? Role.Admin : Role.User});
    } catch (e) {
      this.$notify.error(e);
    }
  }

  get title() {
    return this.user?.name || this.$tc('p.user') + ' ID:' + this.$route.params.id;
  }

  getListables(list) {
    return [
      {name: 'pose', items: list.poses},
      {name: 'flow', items: list.flows},
      {name: 'skill', items: list.skills},
    ].filter(listable => listable.items.length > 0);
  }
}
</script>
