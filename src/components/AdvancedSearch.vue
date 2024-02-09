<template>
  <div
    class="overlay"
    :class="{ active: store.modalOpen }"
    @click="store.modalOpen = false"
  ></div>
  <div class="advanced-search" :class="{ active: store.modalOpen }">
    <div class="filters">
      <div v-for="item in store.filters" :key="item.id">
        <div class="filter-label">
          {{ item.key }}
        </div>
        <div class="filter">
          <div
            class="filter-button"
            @mousedown="filterClick(item, -1)"
            @mouseup="filterRelease()"
          >
            -
          </div>
          <div class="filter-value">
            {{ item.value }}
          </div>
          <div
            class="filter-button"
            @mousedown="filterClick(item, +1)"
            @mouseup="filterRelease()"
          >
            +
          </div>
        </div>
      </div>
    </div>

    <div class="services">
      <div v-for="item in store.services" :key="item.id">
        <div
          class="service"
          :class="{ active: item.active }"
          @click="item.active = !item.active"
        >
          <div>{{ item.key }}</div>
          <div>{{ item.active }}</div>
        </div>
      </div>
    </div>

    <div class="filter-controls">
      <button @click="applyFilters">Filter</button>
      <button @click="resetFilters">Reset</button>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      store,
      interval: null,
    };
  },
  watch: {
    "store.serviceList": {
      handler() {
        if (store.serviceList.length) {
          store.services = this.fetchServices();
        }
      },
      immediate: true,
    },
  },
  methods: {
    fetchServices() {
      return store.serviceList.map((service) => {
        return { key: service.name, id: service.id, active: false };
      });
    },
    filterClick(item, change) {
      this.interval = setInterval(() => {
        item.value += change;
        if (item.value > item.max) item.value = item.max;
        if (item.value < item.min) item.value = item.min;
      }, 50);
    },
    filterRelease() {
      clearInterval(this.interval);
    },
    applyFilters() {
      console.log(store.filters, store.services);
      store.modalOpen = false;
    },
    resetFilters() {
      store.filters.forEach((filter) => (filter.value = filter.min));
      store.services.forEach((service) => (service.active = false));
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.overlay {
  background-color: rgba(0, 0, 0, 0.493);
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 1;
  inset: 0;
  bottom: 100%;
  opacity: 0;
  transition: all 500ms;
  &.active {
    opacity: 1;
    bottom: 0%;
  }
}
.advanced-search {
  z-index: 1;
  border-radius: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 10px;
  width: 100%;
  max-width: 500px;
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 500ms;
  &.active {
    top: 50%;
  }
  .filters,
  .services,
  .filter-controls {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
  }
  .filters {
    text-align: center;
    & > * {
      padding: 10px 0;
    }
    .filter {
      display: flex;
      justify-content: space-between;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      & > * {
        padding: 16px 32px;
      }
      .filter-value {
        font-size: 18px;
        color: rgb(48, 48, 48);
      }
      .filter-button {
        background-color: rgb(73, 218, 174);
        cursor: pointer;
        user-select: none;
        &:hover {
          background-color: rgb(181, 236, 220);
        }
      }
    }
    .filter-label {
      margin-bottom: 4px;
    }
  }
  .services {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    font-size: 14px;

    .service {
      color: grey;
      user-select: none;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      border-radius: 10px;
      transition: 300ms all;
      cursor: pointer;
      &:hover {
        background-color: rgb(216, 252, 249);
      }
      &.active {
        background-color: $primary;
      }
    }
  }
  .filter,
  .service {
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  }
}
.filter-controls {
  display: flex;
  gap: 20px;
  & :first-child {
    flex-grow: 2;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  }
  & :last-child {
    flex-grow: 1;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>
