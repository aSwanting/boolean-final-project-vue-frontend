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
    const queryData = response.data.results.query;
    this.searchQuery = queryData.query;
    this.filters[0].value = queryData.search_radius;
    this.filters[1].value = queryData.rooms;
    this.filters[2].value = queryData.beds;
    this.filters[3].value = queryData.bathrooms;
    this.services.forEach((service, index) => {
      if (queryData.services.includes(service.name)) {
        service.active = true;
      }
    });
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
    this.queryData = response.data.results.query;
  },
});

export default store;
