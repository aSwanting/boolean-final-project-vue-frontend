import { reactive } from "vue";

const store = reactive({
  // Properties
  modalOpen: false,
  searchQuery: null,
  filters: [
    {
      key: "searchRadius",
      value: 20,
      min: 20,
      max: 200,
    },
    {
      key: "rooms",
      value: 1,
      min: 1,
      max: 9,
    },
    {
      key: "beds",
      value: 1,
      min: 1,
      max: 9,
    },
    {
      key: "bathrooms",
      value: 1,
      min: 1,
      max: 9,
    },
  ],
  services: [],
  addressList: [],
  serviceList: [],
  currentApartment: {},
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
});

export default store;
