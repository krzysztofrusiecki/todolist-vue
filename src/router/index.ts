import { supabase } from "@/lib/supabaseClient";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth",
      alias: "/auth",
      component: () => import("../views/AuthView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/today",
      name: "today-todos",
      component: () => import("../views/TodayView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/all",
      name: "all-todos",
      component: () => import("../views/AllTodosView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/tomorrow",
      name: "tomorrow-todos",
      component: () => import("../views/TomorrowView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/next-week",
      name: "week-todos",
      component: () => import("../views/NextWeekView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession();

  if (to.name === "auth" && data.session) {
    next("today");
  } else if (to.meta.requiresAuth && !data.session) {
    next("auth");
  } else {
    next();
  }
});

export default router;
