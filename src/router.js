import { createRouter, createWebHistory } from "vue-router";
import ApartmentsIndex from "./pages/apartments/Index.vue";
import Homepage from "./pages/Home.vue";
import ApartmentShow from "./pages/apartments/Show.vue";
import ApartmentSearch from "./pages/apartments/ApartmentSearch.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    // {
    //   path: "/apartments",
    //   name: "apartments.index",
    //   component: ApartmentsIndex,
    // },
    {
      path: "/apartments",
      name: "apartments.index",
      component: ApartmentSearch,
    },
    {
      path: "/apartments/:slug",
      name: "apartments.show",
      props: true,
      component: ApartmentShow,
    },
  ],
});

export { router };
