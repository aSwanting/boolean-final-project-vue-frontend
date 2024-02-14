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
  BACKEND_URL: "http://127.0.0.1:8000/",

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
  async backendFuzzySearch() {
    if (this.searchQuery) {
      const data = { query: this.searchQuery };
      const response = await axios.post(
        `${store.BACKEND_URL}api/apartments/search`,
        data
      );
      this.searchResults = response.data.results.slice(0, 6);
    }
  },
  async fetchApartments() {
    const response = await axios.get(`${store.BACKEND_URL}api/apartments`);
    store.addressList = response.data.results.apartments;
    store.serviceList = response.data.results.services;
  },
  async searchApartments() {
    let response;
    if (this.searchResults.length) {
      this.data = {
        searchQuery: this.searchQuery,
        latitude: this.searchResults[0].position.lat,
        longitude: this.searchResults[0].position.lon,
        rooms: store.filters[1].value,
        beds: store.filters[2].value,
        bathrooms: store.filters[3].value,
        search_radius: store.filters[0].value,
        services: store.services
          .filter((service) => service.active)
          .map((service) => service.key),
      };

      response = await axios.post(
        `${store.BACKEND_URL}api/apartments`,
        this.data
      );
    }
  },
});

export default store;
