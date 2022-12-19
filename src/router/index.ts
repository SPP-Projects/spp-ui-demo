import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import adminRoutes from "@/router/admin";
import customerRoutes from "@/router/customer";
import guestRoutes from "@/router/guest";

const routes: Array<RouteRecordRaw> = [
  //userMode
  ...customerRoutes,

  //adminMode
  ...adminRoutes,

  //guestMode
  ...guestRoutes,

  //sharedRoutes
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/shared/errors/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/shared/errors/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },

  //logout
  {
    path: "/logout",
    name: "logout",
    component: {
      beforeRouteEnter(to, from, next) {
        const store = useAuthStore();
        store.logout();
        next("/sign-in");
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
