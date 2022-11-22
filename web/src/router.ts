import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import {store} from '~/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', name: 'landing', component: () => import(/* webpackChunkName: "landing" */ '~/pages/landing.page.vue')},
  // {path: '/', redirect: 'home'},
  {path: '/home', name: 'home', component: () => import(/* webpackChunkName: "home" */ '~/pages/home.page.vue'), meta: {access: 'user'}},
  {path: '/auth/google/redirect', name: 'google-auth-callback', component: () => import(/* webpackChunkName: "google-auth-callback" */ '~/pages/auth/google-callback.page.vue')},
  {
    path: '/auth/facebook/callback',
    name: 'facebook-auth-callback',
    component: () => import(/* webpackChunkName: "facebook-auth-callback" */ '~/pages/auth/facebook-callback.page.vue'),
  },
  {path: '/imprint', name: 'imprint', component: () => import(/* webpackChunkName: "imprint" */ '~/pages/imprint.page.vue')},
  {path: '/profile', name: 'profile', component: () => import(/* webpackChunkName: "profile" */ '~/pages/profile/profile.page.vue'), meta: {access: 'user'}},
  {path: '/dictionary', name: 'dictionary', component: () => import(/* webpackChunkName: "dictionary" */ '~/pages/dictionary.page.vue')},
  {path: '/poses', name: 'poses', component: () => import(/* webpackChunkName: "poses" */ '~/pages/pose/poses.page.vue')},
  {path: '/poses/create', name: 'pose-create', component: () => import(/* webpackChunkName: "pose-create" */ '~/pages/pose/pose-create.page.vue'), meta: {access: 'user'}},
  {path: '/poses/:id/edit', name: 'pose-edit', component: () => import(/* webpackChunkName: "pose-edit" */ '~/pages/pose/pose-edit.page.vue'), meta: {access: 'user'}},
  {path: '/poses/:id', name: 'pose-details', component: () => import(/* webpackChunkName: "pose-details" */ '~/pages/pose/pose-details.page.vue')},
  {path: '/flows', name: 'flows', component: () => import(/* webpackChunkName: "flows" */ '~/pages/flow/flows.page.vue')},
  {path: '/flows/create', name: 'flow-create', component: () => import(/* webpackChunkName: "flow-create" */ '~/pages/flow/flow-create.page.vue')},
  {path: '/flows/:id', name: 'flow-details', component: () => import(/* webpackChunkName: "flow-details" */ '~/pages/flow/flow-details.page.vue')},
  {path: '/skills', name: 'skills', component: () => import(/* webpackChunkName: "skills" */ '~/pages/skill/skills.page.vue')},
  {path: '/skills/create', name: 'skill-create', component: () => import(/* webpackChunkName: "skill-create" */ '~/pages/skill/skill-create.page.vue')},
  {path: '/skills/:id', name: 'skill-details', component: () => import(/* webpackChunkName: "skill-details" */ '~/pages/skill/skill-details.page.vue')},
  {path: '/images', name: 'images', component: () => import(/* webpackChunkName: "images" */ '~/pages/image/images.page.vue')},
  {path: '/videos', name: 'videos', component: () => import(/* webpackChunkName: "videos" */ '~/pages/video/videos.page.vue')},
  {path: '/apps', name: 'apps', component: () => import(/* webpackChunkName: "apps" */ '~/pages/apps/apps.page.vue')},
  {path: '/apps/acroulette', name: 'acroulette', component: () => import(/* webpackChunkName: "acroulette" */ '~/pages/apps/acroulette.page.vue')},
  {path: '/apps/acro-quiz', name: 'acro-quiz', component: () => import(/* webpackChunkName: "acro-quiz" */ '~/pages/apps/acro-quiz.page.vue')},
  {path: '/apps/flow-generator', name: 'flow-generator', component: () => import(/* webpackChunkName: "flow-generator" */ '~/pages/apps/flow-generator.page.vue')},
  {path: '/references', name: 'references', component: () => import(/* webpackChunkName: "references" */ '~/pages/references.page.vue')},
  {path: '/communities', name: 'communities', component: () => import(/* webpackChunkName: "communities" */ '~/pages/communities.page.vue')},
  {path: '/my/lists', name: 'my-lists', component: () => import(/* webpackChunkName: "my-lists" */ '~/pages/my/my-lists.page.vue'), meta: {access: 'user'}},
  {path: '/my/favorites', name: 'my-favorites', component: () => import(/* webpackChunkName: "my-favorites" */ '~/pages/my/my-favorites.page.vue'), meta: {access: 'user'}},
  {path: '/my/training', name: 'my-training', component: () => import(/* webpackChunkName: "my-training" */ '~/pages/my/my-training.page.vue'), meta: {access: 'user'}},
  {path: '/my/repertoire', name: 'my-repertoire', component: () => import(/* webpackChunkName: "my-repertoire" */ '~/pages/my/my-repertoire.page.vue'), meta: {access: 'user'}},
  {path: '/my/jams', name: 'my-jams', component: () => import(/* webpackChunkName: "my-jams" */ '~/pages/my/my-jams.page.vue'), meta: {access: 'user'}},
  {path: '/jams', name: 'jams', component: () => import(/* webpackChunkName: "jams" */ '~/pages/jam/jams.page.vue')},
  {path: '/jams/create', name: 'jam-create', component: () => import(/* webpackChunkName: "jam-create" */ '~/pages/jam/jam-create.page.vue'), meta: {access: 'user'}},
  {path: '/jams/:id/edit', name: 'jam-edit', component: () => import(/* webpackChunkName: "jam-edit" */ '~/pages/jam/jam-edit.page.vue'), meta: {access: 'user'}},
  {path: '/jams/:id', name: 'jam-details', component: () => import(/* webpackChunkName: "jam-details" */ '~/pages/jam/jam-details.page.vue')},

  {path: '/admin/dev', name: 'dev', component: () => import(/* webpackChunkName: "dev" */ '~/pages/admin/dev.page.vue'), meta: {access: 'admin'}},
  {path: '/admin/users', name: 'users', component: () => import(/* webpackChunkName: "users" */ '~/pages/admin/user/users.page.vue'), meta: {access: 'admin'}},
  {
    path: '/admin/users/:id', name: 'user-details', component: () => import(/* webpackChunkName: "user-details" */ '~/pages/admin/user/user-details.page.vue'),
    meta: {access: 'admin'},
  },
  {path: '/admin/comments', name: 'comments', component: () => import(/* webpackChunkName: "comments" */ '~/pages/admin/comments.page.vue'), meta: {access: 'admin'}},
  {path: '/admin/feedback', name: 'feedback', component: () => import(/* webpackChunkName: "feedback" */ '~/pages/admin/feedback.page.vue'), meta: {access: 'admin'}},

  // 404 page needs to be last in routes array
  {path: '*', name: 'not-found', component: () => import( /* webpackChunkName: "404.page" */ './pages/404.page.vue')},
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return {x: 0, y: 0, behavior: 'smooth'};
  },
});

router.beforeEach(async (to, from, next) => {
  await store.state.auth.authPendingPromise;

  if (['user', 'admin'].includes(to.meta.access) && !store.state.auth.isSignedIn) {
    return next({name: 'landing'});
  }
  if (to.meta.access === 'admin' && !store.state.auth.isAdmin) {
    return next({name: 'not-found', params: {0: to.path}});
  }
  next();
});
