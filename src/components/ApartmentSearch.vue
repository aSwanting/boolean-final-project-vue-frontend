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
          <!-- <router-link
            class="btn-primary"
            @click.native="searchApartments()"
            :to="{ name: 'search-results' }"
          >
            Search -->
          <button class="filter-button" @click="store.modalOpen = true">
            <font-awesome-icon icon="filter" />
          </button>
          <button class="search-button" @click="searchApartments()">
            Search
          </button>
          <!-- </router-link> -->
        </div>

        <div class="query-results" :class="{ open: searchResults.length }">
          <div class="query-result" v-for="result in searchResults">
            <span @click="queryChecker(result)">
              {{ result.address.freeformAddress }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="apartment-cards">
    <div class="container">
      <h4 class="card-section">Sponsored</h4>
      <div class="card-wrapper sponsored-cards">
        <ApartmentCard
          class="apartment-card"
          :class="{ sponsored: apartment.orders.length }"
          v-for="apartment in store.addressList"
          @click="store.currentApartment = apartment"
          :apartment="apartment"
        >
          <Carousel class="card-image" :apartment="apartment" />
        </ApartmentCard>
      </div>
      <h4 class="card-section">Other Locations</h4>
      <div class="card-wrapper">
        <ApartmentCard
          class="apartment-card"
          :class="{ sponsored: apartment.orders.length }"
          v-for="apartment in store.addressList"
          @click="store.currentApartment = apartment"
          :apartment="apartment"
        >
          <Carousel class="card-image" :apartment="apartment" />
        </ApartmentCard>
      </div>
    </div>
  </section>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import axios from "axios";
import store from "../store";
import ApartmentCard from "../components/ApartmentCard.vue";
import Carousel from "./Carousel.vue";

export default {
  components: {
    DefaultLayout,
    ApartmentCard,
    Carousel,
  },
  data() {
    return {
      store,
      searchQuery: null,
      oldQuery: "",
      searchResults: [],
      debouncedSearch: store.debounce(this.backendFuzzySearch, 300),
      data: {},
    };
  },
  watch: {
    searchQuery() {
      if (this.searchQuery != this.oldQuery) {
        this.debouncedSearch();
      } else {
        this.searchResults = [];
      }
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
    async fetchApartments() {
      const response = await axios.get(`${store.BACKEND_URL}api/apartments`);
      store.addressList = response.data.results.apartments;
      store.serviceList = response.data.results.services;
    },
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

        store.lat = this.searchResults[0].position.lat;
        store.long = this.searchResults[0].position.lon;
        this.searchResults = [];

        response = await axios.post(
          `${store.BACKEND_URL}api/apartments`,
          this.data
        );

        store.addressList = response.data.results.apartments;
        store.serviceList = response.data.results.services;
        this.$router.push({ name: "search-results" });
      }
    },

    queryChecker(result) {
      this.searchQuery = result.address.freeformAddress;
      this.oldQuery = result.address.freeformAddress;
    },
  },
  mounted() {
    this.fetchApartments();
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

  .container {
    max-width: 1200px;
    padding: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .apartment-search {
      // border: 2px solid red;
      width: 80%;

      .location-search {
        border-radius: 9999px;
        display: flex;
        overflow: hidden;
        gap: 2px;

        & > * {
          backdrop-filter: blur(10px);
          flex-grow: 1;
          flex-shrink: 1;
          border-radius: 0;
          outline: none;
          border: none;
          width: 0;
          transition: 300ms all;

          &:nth-child(1) {
            background-color: rgba(255, 255, 255, 0.7);
            width: 74%;
            padding: 14px 40px;
            &:hover {
              background-color: rgba(255, 255, 255, 1);
            }
          }
          &:nth-child(2) {
            background-color: rgba(255, 255, 255, 0.4);
            color: rgb(80, 80, 80);
            width: 6%;
            font-size: 18px;
            &:hover {
              background-color: rgba(255, 255, 255, 1);
              color: rgb(0, 0, 0);
            }
          }
          &:nth-child(3) {
            background-color: rgba(37, 255, 164, 0.5);
            width: 20%;
            &:hover {
              background-color: rgba(30, 233, 149, 0.836);
            }
          }
        }
      }

      .query-results {
        padding: 0px 16px;
        margin: 20px;
        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.548);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        box-shadow: 5px 15px 15px rgba(0, 0, 0, 0.12);
        height: 0px;
        overflow: hidden;
        transition: 300ms all;
        &.open {
          padding: 8px 16px;
          height: 200px;
        }

        .query-result {
          font-size: 14px;
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

          // & :last-child {
          //   color: rgba(0, 0, 0, 0.5);
          //   font-style: italic;
          //   font-size: 12px;
          // }
        }
      }
    }
  }
}

.apartment-cards {
  .container {
    max-width: 1200px;
    padding: 50px;
    height: 100%;
    .card-section {
      color: rgb(73, 73, 73);
      margin-bottom: 12px;
    }
    .card-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 25px;
      border: 1px solid $primary;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 50px;

      &.sponsored-cards {
        .apartment-card {
          display: none;
          &.sponsored {
            display: block;
            .card-image {
              outline: 3px solid $primary;
            }
          }
        }
      }

      .apartment-card {
        display: block;
        &.sponsored {
          display: none;
        }
      }
    }
  }
}
</style>

<!-- .card-image {
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
} -->
