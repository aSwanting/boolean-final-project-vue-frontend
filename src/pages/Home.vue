<template>
  <DefaultLayout>
    <div class="container">
      <div class="apartment-search">
        <!-- location search -->
        <div class="location-search">
          <label for="search-bar">Enter a location to search </label>
          <input
            type="search"
            id="search-bar"
            placeholder="Via del Mandrione, Roma"
            v-model="searchQuery"
          />
          <label for="search-radius">Search radius in km</label>
          <input
            class="query-input"
            type="number"
            name="search-radius"
            id="search-radius"
            min="1"
            v-model="searchRadius"
          />
        </div>
        <div class="query-results">
          <div class="query-result" v-for="result in searchResults">
            <span @click="searchQuery = result.address.freeformAddress">{{
              result.address.freeformAddress
            }}</span>
            <span>
              {{ result.position.lat }},
              {{ result.position.lon }}
            </span>
          </div>
        </div>

        <!-- advanced search -->
        <div class="advanced-search">
          <div class="search-filters">
            <div class="search-filter">
              <label for="rooms">rooms </label>
              <input
                v-model="rooms"
                type="number"
                name="rooms"
                id="rooms"
                min="1"
                placeholder="minimum n°"
              />
            </div>
            <div class="search-filter">
              <label for="beds">beds </label>
              <input
                v-model="beds"
                type="number"
                name="beds"
                id="beds"
                min="1"
                placeholder="minimum n°"
              />
            </div>
            <div class="search-filter">
              <label for="bathrooms">bathrooms </label>
              <input
                v-model="bathrooms"
                type="number"
                name="bathrooms"
                id="bathrooms"
                min="1"
                placeholder="minimum n°"
              />
            </div>
            <div class="search-filter">
              <label for="square_meters">square meters </label>
              <input
                v-model="square_meters"
                type="number"
                name="square_meters"
                id="square_meters"
                min="1"
                placeholder="minimum n°"
              />
            </div>
          </div>
          <div class="service-filters">
            <div v-for="service in serviceList">
              <input
                ref="serviceCheckboxes"
                type="checkbox"
                :id="service.name"
              />
              <label :for="service.name">{{ service.name }}</label>
            </div>
          </div>
        </div>

        <button @click="searchApartments()">search</button>
      </div>

      <div class="card-wrapper">
        <div class="apartment-card" v-for="apartment in addressList">
          <p class="apartment-info">
            <span class="field">Name: </span>{{ apartment.name }}
          </p>
          <p class="apartment-info">
            <span class="field">Address: </span>{{ apartment.address }}
          </p>
          <p class="apartment-info">
            <span class="field">Distance: </span>{{ apartment.distance }} km
          </p>
          <div class="apartment-info">
            <span class="field">Services: </span>
            <ul class="apartment-services">
              <li class="service" v-for="service in apartment.services">
                {{ service.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import axios from "axios";
export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      searchQuery: null,
      searchRadius: 20,
      searchResults: [],
      addressList: [],
      serviceList: [],
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      square_meters: 1,
      BACKEND_URL: "http://127.0.0.1:8000/",
      debouncedSearch: this.debounce(this.backendFuzzySearch, 300),
      data: {},
    };
  },
  watch: {
    searchQuery() {
      this.debouncedSearch();
    },
  },
  methods: {
    // Take user input and suggest matched addresses
    async backendFuzzySearch() {
      if (this.searchQuery) {
        const data = { query: this.searchQuery };
        const response = await axios.post(
          `${this.BACKEND_URL}api/apartments/search`,
          data
        );
        this.searchResults = response.data.results;
      }
    },
    // Send search data to backend for search and filter
    async searchApartments() {
      // If user has entered a search query, send post request to backend with search data
      let response;
      if (this.searchQuery) {
        this.data = {
          rooms: this.rooms,
          beds: this.beds,
          bathrooms: this.bathrooms,
          square_meters: this.square_meters,
          search_radius: this.searchRadius,
          latitude: this.searchResults[0].position.lat,
          longitude: this.searchResults[0].position.lon,
          services: this.$refs.serviceCheckboxes
            .filter((service) => service.checked)
            .map((service) => service.id),
        };
        response = await axios.post(
          `${this.BACKEND_URL}api/apartments`,
          this.data
        );
        // Else if no query is entered, fetch all apartments
      } else {
        response = await axios.get(`${this.BACKEND_URL}api/apartments`);
      }
      this.addressList = response.data.results.apartments;
      this.serviceList = response.data.results.services;
    },
    // Return debounced function
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
  },
  mounted() {
    this.searchApartments();
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.container {
  max-width: 1200px;
  padding: 30px;

  h1 {
    text-align: center;
    padding: 30px;
    text-transform: uppercase;
    font-weight: 100;
    color: rgba(0, 0, 0, 0.5);
  }
  .apartment-search {
    width: 100%;
    padding: 30px;
    border-radius: 10px;
    border: 2px dashed $primary;
    outline: none;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    .location-search {
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed $light-grey;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .query-results {
      border-block: 1px solid $light-grey;
      overflow: auto;
      max-height: 100px;
      .query-result {
        font-size: 12px;
        margin: 8px 16px;
        display: flex;
        & :first-child {
          cursor: pointer;
          margin-right: auto;
          transition: 200ms all;
          &:hover {
            color: $primary;
            font-weight: 700;
          }
        }
      }
    }
    .advanced-search {
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed $light-grey;
      .search-filters {
        padding: 10px;
        border-radius: 10px;
        border: 1px dashed $light-grey;
        display: flex;
        justify-content: space-around;
        gap: 10px;
        margin-bottom: 20px;
      }
      .search-filter {
        text-transform: capitalize;
        input {
          width: 100%;
        }
      }
    }
    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      padding: 6px;
      outline: none;
      flex-grow: 1;
      min-width: 1px;
    }
    .service-filters {
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed $light-grey;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 5px;

      label {
        padding-left: 6px;
      }
    }
  }
  .card-wrapper {
    overflow: auto;
    flex-grow: 1;
    padding: 10px;
    border-radius: 10px;
    border: 2px dashed $primary;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;

    .apartment-card {
      padding: 10px;
      border-radius: 10px;
      border: 2px solid $primary;
      background-color: $light-grey;
      cursor: pointer;
      transition: 500ms all;
      &:hover {
        background-color: $primary-hover;
      }
      .apartment-info {
        padding: 5px;
        font-size: 14px;
        .field {
          font-weight: 800;
        }
        .apartment-services {
          list-style: circle;
          margin-left: 20px;
          padding: 5px;
          .service {
            padding: 2px;
          }
        }
      }
    }
  }
}
</style>
