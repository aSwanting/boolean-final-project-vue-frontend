<template>
  <DefaultLayout>
    <section class="search-hero">
      <div class="container">
        <div class="apartment-search">
          <!-- location search -->
          <div class="location-search">
            <!-- <label for="search-bar">Enter a location to search </label> -->
            <input
              class="search-bar"
              type="search"
              id="search-bar"
              placeholder="Via del Mandrione, Roma"
              v-model="searchQuery"
            />
            <!-- <label for="search-radius">Search radius in km</label> -->
            <!-- <input
              class="search-radius"
              type="number"
              name="search-radius"
              id="search-radius"
              min="1"
              v-model="searchRadius"
            /> -->
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

          <!-- advanced search -->
          <div class="filter-modal">
            <div class="advanced-search">
              <div class="search-filters">
                <h3>Filters</h3>
                <div class="search-filter">
                  <span>Search Radius: </span>
                  <div class="filter-inputs">
                    <input type="range" name="" id="" min="20" max="200" />
                    <!-- <span
                      class="filter-button"
                      @click="filterClick('searchRadius', -1)"
                    >
                      -
                    </span>
                    <span>{{ searchRadius }}km</span>
                    <span
                      class="filter-button"
                      @click="filterClick('searchRadius', +1)"
                    >
                      +
                    </span> -->
                  </div>
                </div>
                <div class="search-filter">
                  <span>Rooms: </span>
                  <div class="filter-inputs">
                    <span
                      class="filter-button"
                      @click="filterClick('rooms', -1)"
                    >
                      -
                    </span>
                    <span>{{ rooms }} </span>
                    <span
                      class="filter-button"
                      @click="filterClick('rooms', +1)"
                    >
                      +
                    </span>
                  </div>
                </div>
                <div class="search-filter">
                  <span>Beds: </span>
                  <div class="filter-inputs">
                    <span
                      class="filter-button"
                      @click="filterClick('beds', -1)"
                    >
                      -
                    </span>
                    <span>{{ beds }} </span>
                    <span
                      class="filter-button"
                      @click="filterClick('beds', +1)"
                    >
                      +
                    </span>
                  </div>
                </div>
                <div class="search-filter">
                  <span>Bathrooms: </span>
                  <div class="filter-inputs">
                    <span
                      class="filter-button"
                      @click="filterClick('bathrooms', -1)"
                    >
                      -
                    </span>
                    <span>{{ bathrooms }} </span>
                    <span
                      class="filter-button"
                      @click="filterClick('bathrooms', +1)"
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
              <div class="service-filters">
                <h3>Services</h3>
                <div>
                  <div
                    v-for="(service, index) in serviceList"
                    class="service-filter"
                    ref="services"
                  >
                    <input
                      class="service-checkbox"
                      ref="serviceCheckboxes"
                      type="checkbox"
                      :id="service.name"
                    />
                    <label @click="labelCheck(index)" :for="service.name">{{
                      service.name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="card-wrapper">
          <div class="apartment-card" v-for="apartment in addressList">
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
    labelCheck(index) {
      this.$refs.serviceCheckboxes[index].checked
        ? this.$refs.services[index].classList.remove("checked")
        : this.$refs.services[index].classList.add("checked");
    },
    filterClick(filter, change) {
      switch (filter) {
        case "searchRadius":
          this.searchRadius += change;
          this.searchRadius < 1 ? (this.searchRadius = 1) : "";
          break;
        case "rooms":
          this.rooms += change;
          this.rooms < 1 ? (this.rooms = 1) : "";
          break;
        case "beds":
          this.beds += change;
          this.beds < 1 ? (this.beds = 1) : "";
          break;
        case "bathrooms":
          this.bathrooms += change;
          this.bathrooms < 1 ? (this.bathrooms = 1) : "";
          break;
      }
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
  background-image: url(../../public/search-hero-bg-3.jpg);
  background-size: cover;
  background-position: 0, 0;
  height: 500px;
}
.container {
  max-width: 1200px;
  padding: 50px;
  height: 100%;
  // display: flex;
  // justify-content: stretch;
  // align-items: center;

  .apartment-search {
    // width: 100%;
    // padding: 30px;
    // border-radius: 10px;
    // background-color: white;

    // outline: none;
    // margin-bottom: 30px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // gap: 20px;
    .location-search {
      // background-color: white;
      border-radius: 9999px;
      display: flex;
      overflow: hidden;
      // gap: 5px;
      & > * {
        // border-radius: 3px;
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
      box-shadow: 5px 15px 15px rgba(0, 0, 0, 0.12);
      margin: 20px;
      background-color: rgba(255, 255, 255, 0.548);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      overflow: auto;
      .query-result {
        font-size: 14px;
        margin: 8px 16px;
        display: flex;
        & :first-child {
          cursor: pointer;
          margin-right: auto;
          transition: 200ms all;
          &:hover {
            color: rgb(21, 145, 114);
            font-weight: 600;
          }
        }
      }
    }
    .filter-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      position: absolute;
      inset: 0;
      z-index: 1;
      .advanced-search {
        background-color: rgba(255, 255, 255, 1);
        width: 100%;
        max-width: 800px;
        padding: 10px;
        border-radius: 10px;
        h3 {
          text-align: center;
          margin-bottom: 20px;
        }

        .search-filters {
          border: 1px solid rgb(230, 230, 230);
          border-radius: 10px;
          padding: 20px;
          margin: 10px;
          .search-filter {
            display: flex;
            justify-content: space-between;
            border: 1px solid rgb(230, 230, 230);
            border-radius: 10px;
            padding: 15px;
            margin: 10px;
            .filter-inputs {
              text-align: center;
              width: 80px;
              display: flex;
              justify-content: space-between;
              .filter-button {
                user-select: none;
                cursor: pointer;
              }
            }
          }
        }
        .service-filters {
          border: 1px solid rgb(230, 230, 230);
          border-radius: 10px;
          padding: 20px;
          margin: 10px;
          & > div {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .service-filter {
            flex-basis: calc((100% / 2) - 10px);
            border: 1px solid rgb(230, 230, 230);
            border-radius: 10px;
            overflow: hidden;
            transition: all 300ms;
            &.checked {
              background-color: $primary;
            }

            label {
              display: block;
              cursor: pointer;
              padding: 15px;
              text-align: center;
            }
            input {
              position: absolute;
              visibility: hidden;
            }
          }
        }
      }
    }
  }
  .card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 18px;

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
