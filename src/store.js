import { reactive } from "vue";
import axios from "axios";

const store = reactive({
  // Properties
  BACKEND_URL: "http://127.0.0.1:8000/",
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

  sponsoredAddressList: null,
  addressList: null,
  services: null,
  queryData: null,

  // temp props for map
  position: { lat: 41.9028, lon: 12.4964 },

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
  async fetchApartmentsAndServices() {
    const response = await axios.get(`${this.BACKEND_URL}api/apartments`);
    this.sponsoredAddressList = response.data.results.apartments;

    const serviceIcons = [
      "wifi",
      "water-ladder",
      "parking",
      "dumbbell",
      "shield",
      "jug-detergent",
      "paw",
      "mug-saucer",
      "hammer",
      "bell-concierge",
    ];

    this.services = response.data.results.services.map((service, index) => {
      return {
        name: service.name,
        id: service.id,
        icon: serviceIcons[index],
        active: false,
      };
    });
  },

  async jsonFetch() {
    const response = await axios.get(
      `${this.BACKEND_URL}api/apartments/results/`
    );
    this.addressList = response.data.results.apartments;
  },

  async searchApartments() {
    const data = {
      search_radius: this.filters[0].value,
      rooms: this.filters[1].value,
      beds: this.filters[2].value,
      bathrooms: this.filters[3].value,
      services: this.services.filter((e) => e.active).map((e) => e.name),
      query: this.searchQuery,
      latitude: this.position.lat,
      longitude: this.position.lon,
    };
    const response = await axios.post(
      `${this.BACKEND_URL}api/apartments`,
      data
    );
    this.addressList = response.data.results.apartments;
  },
});

export default store;
