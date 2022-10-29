import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import CommunitiesPage from '~/pages/communities.page.vue';
import DevPage from '~/pages/dev.page.vue';
import FlowGeneratorPage from '~/pages/flow-generator.page.vue';
import FlowCreatePage from '~/pages/flow/flow-create.page.vue';
import FlowDetailsPage from '~/pages/flow/flow-details.page.vue';
import FlowsPage from '~/pages/flow/flows.page.vue';
import AcroQuizPage from '~/pages/games/acro-quiz.page.vue';
import AcrolettePage from '~/pages/games/acrolette.page.vue';
import HomePage from '~/pages/home.page.vue';
import JamCreatePage from '~/pages/jam/jam-create.page.vue';
import JamDetailsPage from '~/pages/jam/jam-details.page.vue';
import JamsPage from '~/pages/jam/jams.page.vue';
import LoginPage from '~/pages/login.page.vue';
import PoseCreatePage from '~/pages/pose/pose-create.page.vue';
import PoseDetailsPage from '~/pages/pose/pose-details.page.vue';
import PoseEditPage from '~/pages/pose/pose-edit.page.vue';
import PosesPage from '~/pages/pose/poses.page.vue';
import ProfilePage from '~/pages/profile/profile.page.vue';
import ReferencesPage from '~/pages/references.page.vue';
import RegisterPage from '~/pages/register.page.vue';
import SkillCreatePage from '~/pages/skill/skill-create.page.vue';
import SkillDetailsPage from '~/pages/skill/skill-details.page.vue';
import SkillsPage from '~/pages/skill/skills.page.vue';
import UserDetailsPage from '~/pages/user/user-details.page.vue';
import UsersPage from '~/pages/user/users.page.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {path: '/', name: 'landing', component: LandingPage},
  {path: '/', redirect: 'home'},
  {path: '/home', name: 'home', component: HomePage},
  {path: '/login', name: 'login', component: LoginPage},
  {path: '/register', name: 'register', component: RegisterPage},
  {path: '/profile', name: 'profile', component: ProfilePage},
  {path: '/jams', name: 'jams', component: JamsPage},
  {path: '/jams/create', name: 'jam-create', component: JamCreatePage},
  {path: '/jams/:id', name: 'jam-details', component: JamDetailsPage},
  {path: '/poses', name: 'poses', component: PosesPage},
  {path: '/poses/create', name: 'pose-create', component: PoseCreatePage},
  {path: '/poses/:id/edit', name: 'pose-edit', component: PoseEditPage},
  {path: '/poses/:id', name: 'pose-details', component: PoseDetailsPage},
  {path: '/skills', name: 'skills', component: SkillsPage},
  {path: '/skills/create', name: 'skill-create', component: SkillCreatePage},
  {path: '/skills/:id', name: 'skill-details', component: SkillDetailsPage},
  {path: '/flows', name: 'flows', component: FlowsPage},
  {path: '/flows/create', name: 'flow-create', component: FlowCreatePage},
  {path: '/flows/:id', name: 'flow-details', component: FlowDetailsPage},
  {path: '/users', name: 'users', component: UsersPage},
  {path: '/users/:id', name: 'user-details', component: UserDetailsPage},
  {path: '/games/acrolette', name: 'acrolette', component: AcrolettePage},
  {path: '/games/acro-quiz', name: 'acro-quiz', component: AcroQuizPage},
  {path: '/flow-generator', name: 'flow-generator', component: FlowGeneratorPage},
  {path: '/references', name: 'references', component: ReferencesPage},
  {path: '/dev', name: 'dev', component: DevPage},
  {path: '/communities', name: 'communities', component: CommunitiesPage},

  // 404 page needs to be last in routes array
  {path: '*', name: '404', component: () => import( /* webpackChunkName: "404.page" */ './pages/404.page.vue')},
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
