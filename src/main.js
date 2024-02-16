import { createApp } from "vue";
// import './style.css'
import "bootstrap";
import "@fontsource-variable/open-sans";
import App from "./App.vue";
import { router } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHeart,
  faShare,
  faMessage,
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
  faBed,
  faHouse,
  faToilet,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquare
} from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faTelegram,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faSquare,
  faHeart,
  faShare,
  faMessage,
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
  faBed,
  faHouse,
  faToilet,
  faArrowLeftLong,
  faFacebook,
  faTelegram,
  faInstagram,
  faGithub
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
