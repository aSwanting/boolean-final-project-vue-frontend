import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./pages/Home.vue";
import ApartmentShow from "./pages/apartments/Show.vue";
import Index from "./pages/apartments/Index.vue";
import SearchResults from "./pages/apartments/SearchResults.vue"

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
      path: "/apartments",
      name: "index",
      component: Index,
      props: true,
    },
    {
      path: "/apartments/search-results",
      name: "search-results",
      component: SearchResults,
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
