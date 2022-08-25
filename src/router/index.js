import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import profile from "../components/profile.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "sign-up", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  { path: "/profile", component: profile },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
