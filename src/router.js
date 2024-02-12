import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Home.vue";
import ApartmentShow from "./pages/apartments/Show.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
      props: true,
    },

    {
      path: "/apartments/:slug",
      name: "apartments.show",
      component: ApartmentShow,
      props: true,
    },
  ],
});

export { router };
