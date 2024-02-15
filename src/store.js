import { reactive } from "vue";
import axios from "axios";

const store = reactive({
  // Properties
  modalOpen: false,
  searchQuery: null,
  filters: [
    {
      key: "searchRadius",
      name: "Range in kilometers",
      value: 20,
      min: 20,
      max: 200,
    },
    {
      key: "rooms",
      name: "Rooms",
      value: 1,
      min: 1,
      max: 9,
    },
    {
      key: "beds",
      name: "Beds",
      value: 1,
      min: 1,
      max: 9,
    },
    {
      key: "bathrooms",
      name: "Bathrooms",
      value: 1,
      min: 1,
      max: 9,
    },
  ],
  lat: "",
  long: "",
  services: [],
  addressList: null,
  serviceList: null,
  queryData: null,
  data: {},
  BACKEND_URL: "http://127.0.0.1:8000/",
  trigger: true,

  // Methods
  debounce(fn, wait) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      const that = this;
      timer = setTimeout(() => {
        fn.apply(that, args);
      }, wait);
    };
  },
  async fetchApartments() {
    const response = await axios.get(`${this.BACKEND_URL}api/apartments`);
    store.addressList = response.data.results.apartments;
    store.serviceList = response.data.results.services;
  },
  async searchApartments(data) {
    const response = await axios.post(
      `${store.BACKEND_URL}api/apartments`,
      data
    );
    store.addressList = response.data.results.apartments;
    this.triggerStoreFunction();
  },
  triggerStoreFunction() {
    this.trigger = !this.trigger;
  },
  // radiusConverting(i) {
  //   if (i <= 200 && i >= 181) {
  //     return 15
  //   } else if (i <= 180 && i >= 161) {
  //     return 14
  //   }
  //   else if (i <= 160 && i >= 141) {
  //     return 13
  //   }
  //   else if (i <= 140 && i >= 121) {
  //     return 12
  //   }
  //   else if (i <= 120 && i >= 101) {
  //     return 11
  //   }
  //   else if (i <= 100 && i >= 81) {
  //     return 10
  //   }
  //   else if (i <= 80 && i >= 61) {
  //     return 9
  //   }
  //   else if (i <= 60 && i >= 41) {
  //     return 8
  //   }
  //   else if (i <= 40 && i >= 21) {
  //     return 7
  //   }
  //   else if (i <= 20) {
  //     return 6
  //   };
  // }
});

export default store;
