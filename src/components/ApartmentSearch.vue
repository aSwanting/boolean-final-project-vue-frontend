<template>
  <section class="search-hero">
    <div class="container">
      <div class="apartment-search">
        <!-- location search -->
        <div class="location-search">
          <input
            class="search-bar"
            type="search"
            id="search-bar"
            placeholder="Enter an address or region to search (ex. via del Mandrione, Roma)"
            v-model="searchQuery"
          />

          <button class="search-button" @click="searchApartments()">
            Search
          </button>
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

        <button class="filter-button" @click="store.modalOpen = true">
          Filters
        </button>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="card-wrapper">
        <div class="apartment-card" v-for="apartment in store.addressList">
          <div class="card-image">
            <div>{{ apartment }}</div>
          </div>

          <h3 class="apartment-info">
            {{ apartment.region }}, {{ apartment.country }}
          </h3>

          <p v-show="apartment.distance" class="apartment-info">
            {{ apartment.distance }} kilometers away
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import axios from "axios";
import store from "../store";
export default {
  components: {
    DefaultLayout,
  },
  data() {
    return {
      store,
      searchQuery: null,
      searchResults: [],
      debouncedSearch: store.debounce(this.backendFuzzySearch, 300),
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
          `${store.BACKEND_URL}api/apartments/search`,
          data
        );
        this.searchResults = response.data.results.slice(0, 6);
      }
    },
    // Send search data to backend for search and filter
    async searchApartments() {
      // If user has entered a search query, send post request to backend with search data
      let response;
      if (this.searchResults.length) {
        this.data = {
          search_radius: store.filters[0].value,
          rooms: store.filters[1].value,
          beds: store.filters[2].value,
          bathrooms: store.filters[3].value,
          latitude: this.searchResults[0].position.lat,
          longitude: this.searchResults[0].position.lon,
          services: store.services
            .filter((service) => service.active)
            .map((service) => service.key),
        };
        response = await axios.post(
          `${store.BACKEND_URL}api/apartments`,
          this.data
        );
        // Else if no query is entered, fetch all apartments
      } else {
        response = await axios.get(`${store.BACKEND_URL}api/apartments`);
      }
      store.addressList = response.data.results.apartments;
      store.serviceList = response.data.results.services;
    },
  },
  mounted() {
    this.searchApartments();
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.search-hero {
  background-color: rgb(64, 68, 67);
  background-image: url(/search-hero-bg-3.jpg);
  background-size: cover;
  background-position: 0, 0;
  height: 500px;
}
.filter-button {
  aspect-ratio: 1;
  margin: 0 auto;
  border-radius: 50%;
  padding: 20px;
  box-shadow: 5px 15px 15px rgba(0, 0, 0, 0.2);
  display: block;
}
.container {
  max-width: 1200px;
  padding: 50px;
  height: 100%;

  .apartment-search {
    .location-search {
      border-radius: 9999px;
      display: flex;
      overflow: hidden;
      & > * {
        box-shadow: 5px 15px 15px rgba(0, 0, 0, 0.12);
      }
      .search-bar {
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: none;
        outline: none;
        padding: 24px 40px;
        flex-grow: 5;
      }
      .search-button {
        flex-grow: 1;
        border-radius: 0;
      }
    }

    .query-results {
      padding: 6px;
      margin: 20px;
      background-color: rgba(255, 255, 255, 0.548);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      box-shadow: 5px 15px 15px rgba(0, 0, 0, 0.12);
      .query-result {
        font-size: 14px;
        margin: 8px 16px;
        display: flex;
        & :first-child {
          cursor: pointer;
          margin-right: auto;
          transition: 100ms all;
          &:hover {
            color: rgb(21, 145, 114);
            font-weight: 600;
          }
        }
        & :last-child {
          color: rgba(0, 0, 0, 0.5);
          font-style: italic;
          font-size: 12px;
        }
      }
    }
  }

  .card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 25px;

    .apartment-card {
      cursor: pointer;

      .card-image {
        padding: 10px;
        width: 100%;
        aspect-ratio: 1;
        background-color: $primary;
        border-radius: 20px;
        box-shadow: 2px 5px 6px rgba(105, 105, 105, 0.2);
        margin-bottom: 8px;
        overflow: hidden;

        div {
          height: 100%;
          overflow: auto;
          font-size: 12px;
          opacity: 0.5;
        }
      }
      .apartment-info {
        padding: 0px 6px;
        font-size: 14px;
      }
    }
  }
}
</style>
