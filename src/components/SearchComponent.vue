<template>
  <div class="container" :class="{ hidden: searchHidden }">
    <div class="search-wrapper">
      <!-- Search Form Start -->
      <div class="search-form mb-3">
        <div
          class="search-toggle btn btn-sm btn-primary position-absolute"
          @click="searchHidden = !searchHidden"
        >
          <font-awesome-icon icon="filter" />
        </div>
        <input
          v-model="store.searchQuery"
          class="form-control search-input"
          type="search"
          placeholder="Via Roma, Italia"
        />

        <!-- Search Range -->
        <div class="range-form">
          <label class="range-label">{{ store.filters[0].value }} km</label>
          <div class="d-flex gap-3">
            <div>20</div>
            <input
              v-model="store.filters[0].value"
              placeholder="any"
              class="form-range"
              type="range"
              min="20"
              max="200"
            />
            <div>200</div>
          </div>
        </div>

        <button class="btn btn-primary" @click="outputSearchData()">
          search
        </button>
      </div>

      <!-- Suggested queries -->
      <div class="suggested-dropdown" :class="{ open: suggestedAddresses }">
        <div
          v-for="suggested in suggestedAddresses"
          @click="addressSelect(suggested)"
        >
          {{ suggested.address.freeformAddress }}
        </div>
      </div>
      <!-- Advanced Search Form Start -->
      <div class="advanced-search">
        <div class="search-filters mb-3">
          <!-- Rooms -->
          <div class="input-group">
            <span class="input-group-text">
              <font-awesome-icon icon="house" />
              <div class="icon-label">Rooms</div>
            </span>
            <input
              v-model="store.filters[1].value"
              class="form-control"
              type="number"
              min="1"
              max="12"
            />
          </div>
          <!-- Beds -->
          <div class="input-group">
            <span class="input-group-text">
              <font-awesome-icon icon="bed" />
              <div class="icon-label">Beds</div>
            </span>
            <input
              v-model="store.filters[2].value"
              class="form-control"
              type="number"
              min="1"
              max="12"
            />
          </div>
          <!-- Bathrooms -->
          <div class="input-group">
            <span class="input-group-text">
              <font-awesome-icon icon="toilet" />
              <div class="icon-label">Bathrooms</div>
            </span>
            <input
              v-model="store.filters[3].value"
              class="form-control"
              type="number"
              min="1"
              max="12"
            />
          </div>
        </div>
        <!-- Services Start -->
        <div class="search-services">
          <button
            class="service-badge btn btn-sm rounded-pill border-primary"
            v-for="service in store.services"
            :class="{
              'bg-primary': service.active,
            }"
            @click="service.active = !service.active"
          >
            <font-awesome-icon class="service-icon" :icon="service.icon" />
            <span class="service-name">{{ service.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
export default {
  data() {
    return {
      store,
      searchHidden: true,
      searchQuery: null,
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
    backToHome() {
      this.$router.push({ name: "home" });
    },
    async outputSearchData() {
      await store.searchApartments();
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
    toggleService(serviceName) {
      if (this.filter.services.includes(serviceName)) {
        this.filter.services.splice(
          this.filter.services.indexOf(serviceName),
          1
        );
      } else {
        this.filter.services.push(serviceName);
      }
    },
  },
  async mounted() {
    if (!store.addressList) await store.fetchApartmentsAndServices();
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.container {
  max-height: 300px;
  overflow: hidden;
  transition: 300ms all;

  &.hidden {
    max-height: 55px;
  }
}
.search-wrapper {
  position: relative;
  font-size: 14px;
  padding: 10px 15px;
  .search-form {
    display: flex;
    flex-wrap: wrap;
    row-gap: 5px;
    .search-input {
      order: 0;
      flex: 1;
      border: 1px solid $primary;
      border-radius: 999px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 14px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.336);
      }
    }
    .range-form {
      order: 2;
      text-align: center;
      width: 100%;
      color: rgba(0, 0, 0, 0.6);
    }
    button {
      order: 1;
      border-radius: 999px;
      padding: 0 10px;
      font-size: 14px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      // width: 100%;
    }
  }
  .suggested-dropdown {
    z-index: 9999;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.295);
    backdrop-filter: blur(8px);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    width: 98%;
    font-size: 14px;
    padding: 0px;
    overflow: auto;
    height: 0px;
    transition: 300ms all;
    &.open {
      height: 100px;
      padding: 10px;
    }
    & > * {
      cursor: pointer;
      color: rgb(42, 47, 48);
      &:hover {
        font-weight: 600;
        color: rgb(46, 138, 118);
      }
    }
  }
}
.advanced-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & > * {
    display: flex;
    width: 100%;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .search-filters {
    gap: 10px;
    .input-group {
      .input-group-text {
        border: 1px solid $primary;
        color: rgba(0, 0, 0, 0.6);
        width: 62px;
        display: flex;
        justify-content: center;
        background-color: rgb(237, 255, 248);
        border-radius: 999px;
        padding-left: 18px;
        padding-bottom: 15px;

        .icon-label {
          position: absolute;
          font-size: 9px;
          bottom: 1px;
        }
      }
      input {
        border: 1px solid $primary;
        padding: 0 0 0 15px;
        border-radius: 999px;
      }
    }
  }
  .search-services {
    gap: 8px;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .btn {
      width: calc(100% / 5 - 8px);
      color: rgba(0, 0, 0, 0.6);
      position: relative;
      .service-name {
        font-size: 9px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 3px;
      }
      .service-icon {
        padding-bottom: 14px;
        margin-bottom: -5px;
      }
    }
  }
}

.search-toggle {
  top: 5%;
  left: 72%;
  transform: translateX(-50%) scale(85%);
  z-index: 9999;
}
@media (min-width: 768px) {
  .search-wrapper {
    .search-form {
      border: 1px solid rgb(174, 238, 222);
      // padding: 20px;
      display: flex;
      flex-wrap: nowrap;
      gap: 10px;
      border-radius: 999px;
      // align-items: center;
      overflow: hidden;
      & > * {
        width: 60%;
        // border: none;
        outline: none;
        flex: 1;
        border-radius: 0;
      }
      .search-input {
        width: 100%;
        border: none;
        border-radius: 999px;
        // padding-left: 20px;
      }
      .range-form {
        position: relative;
        text-align: center;
        font-size: 14px;
        margin-bottom: -10px;
        top: 11px;
        .range-label {
          position: absolute;
          left: 50%;
          top: -3px;
          transform: translate(-50%, -50%);
        }
      }
      button {
        order: 3;
        flex: 0;
        padding: 0 20px;
      }

      .search-toggle {
        width: 30px;
        left: 290px;
        top: 13px;
        border-radius: 10px;
        aspect-ratio: 1;
      }

      // display: flex;
      // flex-wrap: wrap;
      // gap: 20px;
      // & > * {
      //   // border: 2px solid cyan;
      //   flex: 1 1;
      //   border: none;
      //   outline: none;
      //   padding: 8px;
      // }
      // .range-form {
      //   position: relative;
      //   font-size: 14px;
      //   margin-bottom: -10px;
      //   color: rgba(0, 0, 0, 0.8);

      // }
    }
    .advanced-search {
      .search-services {
        .btn {
          .service-name {
            position: relative;
            font-size: 12px;
            top: -1px;
          }
          .service-icon {
            padding: 0;
            margin: 0;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
