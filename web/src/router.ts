import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import FlowDetailsPage from '~/pages/flow/flow-details.page.vue';
import FlowsPage from '~/pages/flow/flows.page.vue';
import AcrolettePage from '~/pages/games/acrolette.page.vue';
import HomePage from '~/pages/home.page.vue';
import JamCreatePage from '~/pages/jam/jam-create.page.vue';
import JamsPage from '~/pages/jam/jams.page.vue';
import LandingPage from '~/pages/landing.page.vue';
import LoginPage from '~/pages/login.page.vue';
import PoseCreatePage from '~/pages/pose/pose-create.page.vue';
import PoseDetailsPage from '~/pages/pose/pose-details.page.vue';
import PosesPage from '~/pages/pose/poses.page.vue';
import ProfilePage from '~/pages/profile/profile.page.vue';
import ReferencesPage from '~/pages/references.page.vue';
import RegisterPage from '~/pages/register.page.vue';
import SkillsPage from '~/pages/skills.page.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', name: 'landing', component: LandingPage},
  {path: '/home', name: 'home', component: HomePage},
  {path: '/login', name: 'login', component: LoginPage},
  {path: '/register', name: 'register', component: RegisterPage},
  {path: '/profile', name: 'profile', component: ProfilePage},
  {path: '/jams', name: 'jams', component: JamsPage},
  {path: '/jams/create', name: 'jam-create', component: JamCreatePage},
  {path: '/poses', name: 'poses', component: PosesPage},
  {path: '/poses/create', name: 'pose-create', component: PoseCreatePage},
  {path: '/poses/:id', name: 'pose-details', component: PoseDetailsPage},
  {path: '/skills', name: 'skills', component: SkillsPage},
  {path: '/flows', name: 'flows', component: FlowsPage},
  {path: '/flows/:id', name: 'flow-details', component: FlowDetailsPage},
  {path: '/games/acrolette', name: 'acrolette', component: AcrolettePage},
  {path: '/references', name: 'references', component: ReferencesPage},

  // 404 page needs to be last in routes array
  {path: '*', name: '404', component: () => import( /* webpackChunkName: "404.page" */ './pages/404.page.vue')},
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
