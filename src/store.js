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
  }
});

export default store;
