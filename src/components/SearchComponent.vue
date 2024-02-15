<template>
  <div>
    <!-- Search Form Start -->
    <div class="search-form mb-4 input-group shadow">
      <input v-model="searchQuery" class="form-control" type="search" name="" id="" />
      <button class="btn btn-primary" @click="outputSearchData()">
        search
      </button>
    </div>

    <!-- Suggested queries -->
    <div class="shadow border rounded p-3 mb-4" v-if="suggestedAddresses">
      <div v-for="suggested in suggestedAddresses" @click="addressSelect(suggested)">
        {{ suggested.address.freeformAddress }}
      </div>
    </div>

    <!-- Advanced Search Form Start -->
    <div class="d-flex gap-3 advanced-search shadow border rounded p-3 mb-4">
      <!-- Search Range -->
      <div class="border rounded p-3 flex-grow-1">
        <label class="form-label" for="">Search Range of {{ filter.search_radius }} km</label>
        <div class="d-flex gap-3">
          <div>20</div>
          <input v-model="filter.search_radius" class="form-range" type="range" name="" id="" min="20" max="200" />
          <div>200</div>
        </div>
      </div>
      <!-- Rooms -->
      <div class="border rounded p-3 flex-grow-1">
        <label class="form-label" for="">Rooms</label>
        <input v-model="filter.rooms" class="form-control" type="number" name="" id="" min="1" max="12" />
      </div>
      <!-- Beds -->
      <div class="border rounded p-3 flex-grow-1">
        <label class="form-label" for="">Beds</label>
        <input v-model="filter.beds" class="form-control" type="number" name="" id="" min="1" max="12" />
      </div>
      <!-- Bathrooms -->
      <div class="border rounded p-3 flex-grow-1">
        <label class="form-label" for="">Bathrooms</label>
        <input v-model="filter.bathrooms" class="form-control" type="number" name="" id="" min="1" max="12" />
      </div>
    </div>
    <!-- Services Start -->
    <div class="d-flex flex-wrap justify-content-evenly gap-3">
      <button class="service-badge btn btn-sm btn-secondary rounded-pill shadow" v-for="service in store.serviceList"
        :class="{
          'btn-success': filter.services.includes(service.name),
        }" @click="toggleService(service.name)">
        {{ service.name }}
      </button>
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
      filter: {
        search_radius: 20,
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        services: [],
      },
      debouncedSearch: store.debounce(this.backendFuzzySearch, 300),
    };
  },
  watch: {
    searchQuery() {
      if (this.searchQuery !== this.selectedAddress) this.debouncedSearch();
    },
    filter: {
      handler() {
        console.log("filter changed");
      },
      deep: true,
    },
  },
  methods: {
    async outputSearchData() {
      const data = {
        ...this.filter,
        query: this.searchQuery,
        latitude: this.position.lat,
        longitude: this.position.lon,
      };
      store.data = data
      await store.searchApartments(data);
      this.suggestedAddresses = null;
    },
    addressSelect(suggested) {
      this.searchQuery = suggested.address.freeformAddress;
      this.selectedAddress = suggested.address.freeformAddress;
      this.position = suggested.position;
      this.suggestedAddresses = null;
    },
    async backendFuzzySearch() {
      if (this.searchQuery) {
        const data = { query: this.searchQuery };
        const response = await axios.post(
          `${store.BACKEND_URL}api/apartments/search`,
          data
        );
        this.suggestedAddresses = response.data.results.slice(0, 6);
        this.position = this.suggestedAddresses[0].position;
      }
    },
    async fetchApartments() {
      await store.fetchApartments();
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
  mounted() {
    this.fetchApartments();
  },
};
</script>

<style lang="scss" scoped></style>
