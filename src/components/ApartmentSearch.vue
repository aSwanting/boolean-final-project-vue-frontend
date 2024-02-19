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
            v-model="store.searchQuery"
          />
          <button class="filter-button" @click="store.modalOpen = true">
            <font-awesome-icon icon="filter" />
          </button>
          <button class="search-button" @click="outputSearchData()">
            Search
          </button>
        </div>

        <div class="query-results" :class="{ open: suggestedAddresses }">
          <div class="query-result" v-for="result in suggestedAddresses">
            <span @click="addressSelect(result)">
              {{ result.address.freeformAddress }}
            </span>
          </div>
        </div>
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
import Loading from "./Loading.vue";

export default {
  components: {
    DefaultLayout,
    ApartmentCard,
    Carousel,
    Loading,
  },
  data() {
    return {
      store,
      suggestedAddresses: null,
      selectedAddress: null,
      position: null,
      debouncedSearch: store.debounce(this.backendFuzzySearch, 300),
    };
  },
  watch: {
    "store.searchQuery": {
      handler(newVal, oldVal) {
        if (oldVal && store.searchQuery !== this.selectedAddress) {
          this.debouncedSearch();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async outputSearchData() {
      await store.searchApartments();
      this.$router.push({ name: "search-results" });
      this.suggestedAddresses = null;
    },
    addressSelect(suggested) {
      store.searchQuery = suggested.address.freeformAddress;
      this.selectedAddress = suggested.address.freeformAddress;
      this.position = suggested.position;
      store.position = suggested.position;
      this.suggestedAddresses = null;
    },
    async backendFuzzySearch() {
      if (store.searchQuery) {
        const data = { query: store.searchQuery };
        const response = await axios.post(
          `${store.BACKEND_URL}api/apartments/search`,
          data
        );
        this.suggestedAddresses = response.data.results.slice(0, 6);
        this.position = this.suggestedAddresses[0].position;
        store.position = this.suggestedAddresses[0].position;
      }
    },
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
    // max-width: 1200px;
    // padding: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .apartment-search {
      // border: 2px solid red;
      width: 80%;

      .location-search {
        border-radius: 15px;
        display: flex;
        flex-wrap: wrap;
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

          &:nth-child(1) {
            background-color: rgba(255, 255, 255, 0.7);
            width: 100%;
            padding: 14px 40px;

            &:hover {
              background-color: rgba(255, 255, 255, 1);
            }
          }

          &:nth-child(2) {
            background-color: rgba(255, 255, 255, 0.4);
            color: rgb(80, 80, 80);
            width: 20%;
            font-size: 18px;

            &:hover {
              background-color: rgba(255, 255, 255, 1);
              color: rgb(0, 0, 0);
            }
          }

          &:nth-child(3) {
            background-color: rgba(37, 255, 164, 0.5);
            width: 70%;

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
    // max-width: 1200px;
    padding: 50px;
    height: 100%;
    position: relative;

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
      position: relative;
      min-height: 180px;

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

@media (min-width: 768px) {
  .search-hero {
    background-color: rgb(64, 68, 67);
    background-image: url(/search-hero-bg-3.jpg);
    background-size: cover;
    background-position: 0, 0;
    height: 500px;

    .container {
      .apartment-search {
        .location-search {
          border-radius: 999px;
          display: flex;
          flex-wrap: nowrap;
          & > * {
            &:nth-child(1) {
              width: 74%;
            }

            &:nth-child(2) {
              width: 6%;
              font-size: 18px;
            }

            &:nth-child(3) {
              width: 20%;
            }
          }
        }
      }
    }
  }
}
</style>
