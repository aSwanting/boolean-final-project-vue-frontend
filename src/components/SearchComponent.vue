<template>
  <div class="search-wrapper">
    <!-- Search Form Start -->
    <div class="search-form mb-3">
      <input
        v-model="store.searchQuery"
        class="form-control search-input"
        type="search"
        name=""
        id=""
      />
      <!-- Search Range -->
      <div class="range-form">
        <label class="form-label range-label" for=""
          >{{ store.filters[0].value }} km</label
        >
        <div class="d-flex gap-3">
          <div>20</div>
          <input
            v-model="store.filters[0].value"
            class="form-range"
            type="range"
            name=""
            id=""
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
      <div class="search-filters">
        <!-- Rooms -->
        <div class="">
          <font-awesome-icon icon="house" />
          <input
            v-model="store.filters[1].value"
            class=""
            type="number"
            name=""
            id=""
            min="1"
            max="12"
          />
        </div>
        <!-- Beds -->
        <div class="">
          <font-awesome-icon icon="bed" />
          <input
            v-model="store.filters[2].value"
            class=""
            type="number"
            name=""
            id=""
            min="1"
            max="12"
          />
        </div>
        <!-- Bathrooms -->
        <div class="">
          <font-awesome-icon icon="toilet" />
          <input
            v-model="store.filters[3].value"
            class=""
            type="number"
            name=""
            id=""
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
          {{ service.name }}
        </button>
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

// .search-form {
//   border: 1px solid rgb(174, 238, 222);
//   border-radius: 999px;
//   overflow: hidden;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   align-items: center;
//   & > * {
//     // border: 2px solid cyan;
//     flex: 1 1;
//     border: none;
//     outline: none;
//     padding: 8px;
//   }
//   .search-input {
//     outline: none;
//     flex: 1 1 30%;
//     padding-left: 20px;
//     color: rgba(0, 0, 0, 0.8);
//   }
//   .range-form {
//     position: relative;
//     font-size: 14px;
//     margin-bottom: -10px;
//     color: rgba(0, 0, 0, 0.8);

//     .range-label {
//       position: absolute;
//       left: 50%;
//       top: 5px;
//       transform: translate(-50%, -50%);
//     }
//   }
// }
// .search-wrapper {
//   position: relative;
//   .suggested-dropdown {
//     position: absolute;
//     top: 50px;
//     left: 50%;
//     transform: translateX(-50%);
//     background-color: rgba(255, 255, 255, 0.295);
//     backdrop-filter: blur(8px);
//     box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
//     width: 98%;
//     font-size: 14px;
//     padding: 0px;
//     overflow: auto;
//     height: 0px;
//     transition: 300ms all;
//     &.open {
//       height: 100px;
//       padding: 10px;
//     }
//   }
// }
// .advanced-search {
//   // display: flex;
//   // align-items: center;
//   // gap: 20px;
//   // height: 32px;

//   .search-filters {
//     // display: flex;
//     // gap: 4px;
//     // color: rgb(90, 90, 90);
//     // align-items: center;
//     // border: 1px solid $primary;
//     // border-radius: 999px;
//     // overflow: hidden;
//     // white-space: nowrap;
//     // font-size: 14px;
//     & > * {
//       // flex: 1 1;
//       // padding-left: 10px;
//       // margin-right: -10px;
//     }
//     // input {
//     //   text-align: center;
//     //   border: none;
//     //   outline: none;
//     // }
//   }
//   .search-services {
//     // flex: 1;
//     // display: grid;
//     // gap: 10px;
//     // grid-template-rows: repeat(1px);
//     // overflow: hidden;
//     // justify-content: space-between;
//     // flex-wrap: wrap;
//   }
// }
</style>
