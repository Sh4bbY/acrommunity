import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import {store} from '~/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', name: 'landing', component: () => import(/* webpackChunkName: "landing" */ '~/pages/landing.page.vue')},
  // {path: '/', redirect: 'home'},
  {path: '/home', name: 'home', component: () => import(/* webpackChunkName: "home" */ '~/pages/home.page.vue'), meta: {access: 'user'}},
  {path: '/auth/google/callback', name: 'google-auth-callback', component: () => import(/* webpackChunkName: "google-auth-callback" */ '~/pages/auth/google-callback.page.vue')},
  {
    path: '/auth/facebook/callback',
    name: 'facebook-auth-callback',
    component: () => import(/* webpackChunkName: "facebook-auth-callback" */ '~/pages/auth/facebook-callback.page.vue'),
  },
  {path: '/imprint', name: 'imprint', component: () => import(/* webpackChunkName: "imprint" */ '~/pages/imprint.page.vue')},
  {path: '/profile', name: 'profile', component: () => import(/* webpackChunkName: "profile" */ '~/pages/profile/profile.page.vue'), meta: {access: 'user'}},
  {path: '/dictionary', name: 'dictionary', component: () => import(/* webpackChunkName: "dictionary" */ '~/pages/dictionary.page.vue')},
  {path: '/poses', name: 'poses', component: () => import(/* webpackChunkName: "poses" */ '~/pages/pose/poses.page.vue')},
  {path: '/poses/favorites', name: 'pose-favorites', component: () => import(/* webpackChunkName: "pose-favorites" */ '~/pages/pose/poses.page.vue'), meta: {access: 'user'}},
  {path: '/poses/repertoire', name: 'pose-repertoire', component: () => import(/* webpackChunkName: "pose-repertoire" */ '~/pages/pose/poses.page.vue'), meta: {access: 'user'}},
  {path: '/poses/training-plan', name: 'pose-training-plan', component: () => import(/* webpackChunkName: "pose-training-plan" */ '~/pages/pose/poses.page.vue'), meta: {access: 'user'}},
  {path: '/poses/create', name: 'pose-create', component: () => import(/* webpackChunkName: "pose-create" */ '~/pages/pose/pose-create.page.vue'), meta: {access: 'user'}},
  {path: '/poses/:id/edit', name: 'pose-edit', component: () => import(/* webpackChunkName: "pose-edit" */ '~/pages/pose/pose-edit.page.vue'), meta: {access: 'user'}},
  {path: '/poses/:id', name: 'pose-details', component: () => import(/* webpackChunkName: "pose-details" */ '~/pages/pose/pose-details.page.vue')},
  {path: '/flows', name: 'flows', component: () => import(/* webpackChunkName: "flows" */ '~/pages/flow/flows.page.vue')},
  {path: '/flows/favorites', name: 'flow-favorites', component: () => import(/* webpackChunkName: "flow-favorites" */ '~/pages/flow/flows.page.vue'), meta: {access: 'user'}},
  {path: '/flows/repertoire', name: 'flow-repertoire', component: () => import(/* webpackChunkName: "flow-repertoire" */ '~/pages/flow/flows.page.vue'), meta: {access: 'user'}},
  {path: '/flows/training-plan', name: 'flow-training-plan', component: () => import(/* webpackChunkName: "flow-training-plan" */ '~/pages/flow/flows.page.vue'), meta: {access: 'user'}},
  {path: '/flows/create', name: 'flow-create', component: () => import(/* webpackChunkName: "flow-create" */ '~/pages/flow/flow-create.page.vue')},
  {path: '/flows/:id', name: 'flow-details', component: () => import(/* webpackChunkName: "flow-details" */ '~/pages/flow/flow-details.page.vue')},
  {path: '/skills', name: 'skills', component: () => import(/* webpackChunkName: "skills" */ '~/pages/skill/skills.page.vue')},
  {path: '/skills/favorites', name: 'skill-favorites', component: () => import(/* webpackChunkName: "skill-favorites" */ '~/pages/skill/skills.page.vue'), meta: {access: 'user'}},
  {path: '/skills/repertoire', name: 'skill-repertoire', component: () => import(/* webpackChunkName: "skill-repertoire" */ '~/pages/skill/skills.page.vue'), meta: {access: 'user'}},
  {path: '/skills/training-plan', name: 'skill-training-plan', component: () => import(/* webpackChunkName: "skill-training-plan" */ '~/pages/skill/skills.page.vue'), meta: {access: 'user'}},
  {path: '/skills/create', name: 'skill-create', component: () => import(/* webpackChunkName: "skill-create" */ '~/pages/skill/skill-create.page.vue')},
  {path: '/skills/:id', name: 'skill-details', component: () => import(/* webpackChunkName: "skill-details" */ '~/pages/skill/skill-details.page.vue')},
  {path: '/images', name: 'images', component: () => import(/* webpackChunkName: "images" */ '~/pages/image/images.page.vue')},
  {path: '/images/favorites', name: 'image-favorites', component: () => import(/* webpackChunkName: "image-favorites" */ '~/pages/image/images.page.vue'), meta: {access: 'user'}},
  {path: '/images/repertoire', name: 'image-repertoire', component: () => import(/* webpackChunkName: "image-repertoire" */ '~/pages/image/images.page.vue'), meta: {access: 'user'}},
  {path: '/images/training-plan', name: 'image-training-plan', component: () => import(/* webpackChunkName: "image-training-plan" */ '~/pages/image/images.page.vue'), meta: {access: 'user'}},
  {path: '/videos', name: 'videos', component: () => import(/* webpackChunkName: "videos" */ '~/pages/video/videos.page.vue')},
  {path: '/videos/favorites', name: 'video-favorites', component: () => import(/* webpackChunkName: "video-favorites" */ '~/pages/video/videos.page.vue'), meta: {access: 'user'}},
  {path: '/videos/repertoire', name: 'video-repertoire', component: () => import(/* webpackChunkName: "video-repertoire" */ '~/pages/video/videos.page.vue'), meta: {access: 'user'}},
  {path: '/videos/training-plan', name: 'video-training-plan', component: () => import(/* webpackChunkName: "video-training-plan" */ '~/pages/video/videos.page.vue'), meta: {access: 'user'}},
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
  {path: '/my/marks', name: 'my-marks', component: () => import(/* webpackChunkName: "my-marks" */ '~/pages/my/my-marks.page.vue'), meta: {access: 'user'}},
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
  {path: '/admin/comments/:id', name: 'comment-details', component: () => import(/* webpackChunkName: "comment-details" */ '~/pages/admin/comment-details.page.vue'), meta: {access: 'admin'}},
  {path: '/admin/feedback', name: 'feedback', component: () => import(/* webpackChunkName: "feedback" */ '~/pages/admin/feedback.page.vue'), meta: {access: 'admin'}},
  {path: '/admin/feedback/:id', name: 'feedback-details', component: () => import(/* webpackChunkName: "feedback-details" */ '~/pages/admin/feedback-details.page.vue'), meta: {access: 'admin'}},

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
