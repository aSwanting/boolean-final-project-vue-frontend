import { createApp } from "vue";
// import './style.css'
import "bootstrap";
import "@fontsource-variable/open-sans";
import App from "./App.vue";
import { router } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faWifi,
  faWaterLadder,
  faSquareParking,
  faDumbbell,
  faShield,
  faPaw,
  faHammer,
  faBellConcierge,
  faDice,
  faJugDetergent,
  faMugSaucer,
  faCircleChevronRight,
  faChevronCircleLeft,
  faPlusCircle,
  faMinusCircle,
  faFilter,

} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUser,
  faWifi,
  faWaterLadder,
  faSquareParking,
  faDumbbell,
  faShield,
  faPaw,
  faHammer,
  faBellConcierge,
  faDice,
  faJugDetergent,
  faMugSaucer,
  faCircleChevronRight,
  faChevronCircleLeft,
  faPlusCircle,
  faMinusCircle,
  faFilter
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
