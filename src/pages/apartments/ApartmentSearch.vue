<template>
  <div class="container">
    <h1>Search and Filter Apartments</h1>
    <div class="apartment-search">
      <!-- location search -->
      <div class="location-search">
        <label for="apt-searchbar">Enter a location to search </label>
        <input
          type="search"
          id="apt-searchbar"
          placeholder="Via del Mandrione, Roma"
          v-model="searchQuery"
        />

        <label for="search-radius">Search radius in km</label>
        <input
          class="query-input"
          type="number"
          name="search-radius"
          id="search-radius"
          v-model="searchRadius"
        />
      </div>
      <div class="query-results">
        <div class="query-result" v-for="result in searchResults">
          <span @click="searchSuggested(result.address.freeformAddress)">{{
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
        <div>
          <label for="rooms">rooms </label>
          <input
            v-model="rooms"
            type="number"
            name="rooms"
            id="rooms"
            min="1"
            :max="maxRooms"
            placeholder="minimum n°"
          />
        </div>
        <div>
          <label for="beds">beds </label>
          <input
            v-model="beds"
            type="number"
            name="beds"
            id="beds"
            min="1"
            :max="maxBeds"
            placeholder="minimum n°"
          />
        </div>
        <div>
          <label for="bathrooms">bathrooms </label>
          <input
            v-model="bathrooms"
            type="number"
            name="bathrooms"
            id="bathrooms"
            min="1"
            :max="maxBathrooms"
            placeholder="minimum n°"
          />
        </div>
        <div>
          <label for="square_meters">square meters </label>
          <input
            v-model="square_meters"
            type="number"
            name="square_meters"
            id="square_meters"
            min="1"
            :max="maxSqMeters"
            placeholder="minimum n°"
          />
        </div>
      </div>
      <div class="servicesFilter">
        <div v-for="(service, index) in services">
          <input ref="serviceCheckboxes" type="checkbox" :id="service" />
          <label :for="service">{{ service }}</label>
        </div>
      </div>

      <button @click="searchApartments()">search</button>
    </div>

    <div class="card-wrapper">
      <ul class="item-card" v-for="apartment in filteredList">
        <li class="item-info" v-for="(value, field) in apartment">
          <!-- Print field (eg: id, rooms, beds, etc) -->
          <span class="field">{{ field }}: </span>

          <!-- If user field, print user first and last name -->
          <span v-if="field == 'user'" class="value">
            {{ value.first_name }} {{ value.last_name }}
          </span>

          <!-- If services field, print services -->
          <ul v-else-if="field == 'services'" class="value services">
            <li v-for="item in value">
              {{ item.name }}
            </li>
          </ul>

          <!-- Else print other apartment info -->
          <span v-else class="value">{{ value }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchRadius: 20,
      searchQuery: null,
      searchResults: null,
      addressList: [],
      filteredList: [],
      filterResults: [],
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      square_meters: 1,
      checkedServices: [],
    };
  },
  watch: {
    searchQuery() {
      this.tomtomSearch();
    },
  },
  methods: {
    searchSuggested(suggestedAddress) {
      this.searchQuery = suggestedAddress;
      this.tomtomFilter();
    },
    async tomtomSearch() {
      if (this.searchQuery) {
        const response = await axios.get(
          "https://api.tomtom.com/search/2/search/" +
            this.searchQuery +
            ".json?key=qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
          {
            params: {
              key: this.API_KEY,
            },
          }
        );
        this.searchResults = response.data.results;
      }
    },
    async tomtomFilter() {
      this.filteredList = [];
      const lat = this.searchResults[0].position.lat;
      const lon = this.searchResults[0].position.lon;
      this.filterResults = [];
      const totalItems = this.addressList.length;
      const batchSize = 25;
      let offset = 0;

      while (offset < totalItems) {
        const data = {
          poiList: this.locationList.slice(offset, offset + batchSize),
          geometryList: [
            {
              position: lat + "," + lon,
              radius: this.searchRadius * 1000,
              type: "CIRCLE",
            },
          ],
        };

        const response = await axios.post(
          "https://api.tomtom.com/search/2/geometryFilter.json",
          data,
          {
            params: {
              key: "qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
            },
          }
        );

        console.log(response.data.results);

        this.filterResults.push(...response.data.results);

        offset += batchSize;

        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      console.log(this.filterResults);
      this.filteredList = this.filterResults;
    },
    async fetchData() {
      const response = await axios.get("http://127.0.0.1:8000/api/apartments");
      this.addressList = response.data.results;
      this.filteredList = this.addressList;
    },
    searchApartments() {
      this.checkedServices = [];
      this.$refs.serviceCheckboxes.forEach((element) => {
        if (element.checked) this.checkedServices.push(element.id);
      });
      this.filteredList = this.apartments();
    },
    apartments() {
      // this.addressList.forEach((address) => {
      //   // services.forEach((service) => console.log(service));
      //   address.services.forEach((service) => {
      //     if (this.checkedServices.includes(service.name)) {
      //       console.log(address.name, service.name);
      //     }
      //   });
      // });
      return this.addressList.filter((item) => {
        return (
          item.rooms >= this.rooms &&
          item.beds >= this.beds &&
          item.bathrooms >= this.bathrooms &&
          item.square_meters >= this.square_meters
        );
      });
    },
  },
  computed: {
    locationList() {
      return this.addressList.map((address) => {
        return {
          ...address,
          position: {
            lat: address.latitude,
            lon: address.longitude,
          },
        };
      });
    },
    services() {
      const serviceList = [];
      this.addressList.forEach((address) => {
        const services = address.services;
        services.forEach((service) => {
          const serviceName = service.name;
          if (!serviceList.includes(serviceName)) {
            serviceList.push(serviceName);
          }
        });
      });
      return serviceList;
    },
    maxRooms() {
      if (this.addressList.length) {
        return this.addressList
          .map((element) => element.rooms)
          .reduce((previous, current) =>
            current >= previous ? current : previous
          );
      }
    },
    maxBeds() {
      if (this.addressList.length) {
        return this.addressList
          .map((element) => element.beds)
          .reduce((previous, current) =>
            current >= previous ? current : previous
          );
      }
    },
    maxBathrooms() {
      if (this.addressList.length) {
        return this.addressList
          .map((element) => element.bathrooms)
          .reduce((previous, current) =>
            current >= previous ? current : previous
          );
      }
    },
    maxSqMeters() {
      if (this.addressList.length) {
        return this.addressList
          .map((element) => element.square_meters)
          .reduce((previous, current) =>
            current >= previous ? current : previous
          );
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
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
    border: 1px dashed rgb(82, 82, 82);
    outline: none;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    .location-search {
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed rgb(82, 82, 82);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .query-results {
      border-block: 1px solid rgba(69, 126, 91, 0.151);
      overflow: auto;
      .query-result {
        font-size: 12px;
        margin: 8px 16px;
        display: flex;
        & :first-child {
          cursor: pointer;
          margin-right: auto;
          transition: 200ms all;
          &:hover {
            color: rgb(31, 185, 152);
            font-weight: 700;
          }
        }
      }
    }
    .advanced-search {
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed rgb(82, 82, 82);
      display: flex;
      justify-content: space-around;
    }
    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      padding: 6px;
      outline: none;
      flex-grow: 1;
    }
    .servicesFilter {
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed rgb(82, 82, 82);
      display: flex;
      justify-content: space-around;

      label {
        padding-left: 6px;
      }
    }
  }
  .card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .item-card {
      border: 2px solid rgba(0, 0, 0, 0.4);
      border-radius: 10px;
      .item-info {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 5px;
        margin: 5px;
        font-size: 14px;
        .field {
          font-weight: 800;
        }
        .services {
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 5px;
          margin: 5px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
