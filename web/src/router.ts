import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import CommentsPage from '~/pages/admin/comments.page.vue';
import DevPage from '~/pages/admin/dev.page.vue';
import FeedbackPage from '~/pages/admin/feedback.page.vue';
import UserDetailsPage from '~/pages/admin/user/user-details.page.vue';
import UsersPage from '~/pages/admin/user/users.page.vue';
import AcroQuizPage from '~/pages/apps/acro-quiz.page.vue';
import AcrolettePage from '~/pages/apps/acrolette.page.vue';
import GamesPage from '~/pages/apps/apps.page.vue';
import FlowGeneratorPage from '~/pages/apps/flow-generator.page.vue';
import LoginPage from '~/pages/auth/login.page.vue';
import RegisterPage from '~/pages/auth/register.page.vue';
import CommunitiesPage from '~/pages/communities.page.vue';
import DictionaryPage from '~/pages/dictionary.page.vue';
import FlowCreatePage from '~/pages/flow/flow-create.page.vue';
import FlowDetailsPage from '~/pages/flow/flow-details.page.vue';
import FlowsPage from '~/pages/flow/flows.page.vue';
import HomePage from '~/pages/home.page.vue';
import ImagesPage from '~/pages/image/images.page.vue';
import JamCreatePage from '~/pages/jam/jam-create.page.vue';
import JamDetailsPage from '~/pages/jam/jam-details.page.vue';
import JamsPage from '~/pages/jam/jams.page.vue';
import LandingPage from '~/pages/landing.page.vue';
import MyFavoritesPage from '~/pages/my/my-favorites.page.vue';
import MyListsPage from '~/pages/my/my-lists.page.vue';
import PoseCreatePage from '~/pages/pose/pose-create.page.vue';
import PoseDetailsPage from '~/pages/pose/pose-details.page.vue';
import PoseEditPage from '~/pages/pose/pose-edit.page.vue';
import PosesPage from '~/pages/pose/poses.page.vue';
import ProfilePage from '~/pages/profile/profile.page.vue';
import ReferencesPage from '~/pages/references.page.vue';
import SkillCreatePage from '~/pages/skill/skill-create.page.vue';
import SkillDetailsPage from '~/pages/skill/skill-details.page.vue';
import SkillsPage from '~/pages/skill/skills.page.vue';
import VideosPage from '~/pages/video/videos.page.vue';
import {store} from '~/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', name: 'landing', component: LandingPage},
  // {path: '/', redirect: 'home'},
  {path: '/login', name: 'login', component: LoginPage},
  {path: '/register', name: 'register', component: RegisterPage},
  {path: '/jams', name: 'jams', component: JamsPage},
  {path: '/jams/:id', name: 'jam-details', component: JamDetailsPage},
  {path: '/home', name: 'home', component: HomePage, meta: {access: 'user'}},
  {path: '/profile', name: 'profile', component: ProfilePage, meta: {access: 'user'}},
  {path: '/jams/create', name: 'jam-create', component: JamCreatePage, meta: {access: 'user'}},
  {path: '/dictionary', name: 'dictionary', component: DictionaryPage},
  {path: '/poses', name: 'poses', component: PosesPage},
  {path: '/poses/create', name: 'pose-create', component: PoseCreatePage, meta: {access: 'user'}},
  {path: '/poses/:id/edit', name: 'pose-edit', component: PoseEditPage, meta: {access: 'user'}},
  {path: '/poses/:id', name: 'pose-details', component: PoseDetailsPage},
  {path: '/flows', name: 'flows', component: FlowsPage},
  {path: '/flows/create', name: 'flow-create', component: FlowCreatePage},
  {path: '/flows/:id', name: 'flow-details', component: FlowDetailsPage},
  {path: '/skills', name: 'skills', component: SkillsPage},
  {path: '/skills/create', name: 'skill-create', component: SkillCreatePage},
  {path: '/skills/:id', name: 'skill-details', component: SkillDetailsPage},
  {path: '/images', name: 'images', component: ImagesPage},
  {path: '/videos', name: 'videos', component: VideosPage},
  {path: '/apps', name: 'apps', component: GamesPage},
  {path: '/apps/acrolette', name: 'acrolette', component: AcrolettePage},
  {path: '/apps/acro-quiz', name: 'acro-quiz', component: AcroQuizPage},
  {path: '/apps/flow-generator', name: 'flow-generator', component: FlowGeneratorPage},
  {path: '/references', name: 'references', component: ReferencesPage},
  {path: '/communities', name: 'communities', component: CommunitiesPage},
  {path: '/my/lists', name: 'my-lists', component: MyListsPage, meta: {access: 'user'}},
  {path: '/my/favorites', name: 'my-favorites', component: MyFavoritesPage, meta: {access: 'user'}},
  {path: '/admin/dev', name: 'dev', component: DevPage, meta: {access: 'admin'}},
  {path: '/admin/users', name: 'users', component: UsersPage, meta: {access: 'admin'}},
  {path: '/admin/users/:id', name: 'user-details', component: UserDetailsPage, meta: {access: 'admin'}},
  {path: '/admin/comments', name: 'comments', component: CommentsPage, meta: {access: 'admin'}},
  {path: '/admin/feedback', name: 'feedback', component: FeedbackPage, meta: {access: 'admin'}},

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
    return next({name: 'login'});
  }
  if (to.meta.access === 'admin' && !store.state.auth.isAdmin) {
    return next({name: 'not-found', params: {0: to.path}});
  }
  next();
});
