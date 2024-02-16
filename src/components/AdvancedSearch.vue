<template>
  <div
    class="overlay"
    :class="{ active: store.modalOpen }"
    @click="store.modalOpen = false"
  ></div>
  <div class="advanced-search" :class="{ active: store.modalOpen }">
    <div class="search-options">
      <div class="filters">
        <div v-for="filter in store.filters">
          <div class="filter-label">
            {{ filter.name }}
          </div>
          <div class="filter">
            <div
              class="filter-button"
              @mousedown="filterClick(filter, -1)"
              @mouseup="filterRelease()"
            >
              <font-awesome-icon icon="circle-minus" />
            </div>
            <div class="filter-value">
              {{ filter.value }}
            </div>
            <div
              class="filter-button"
              @mousedown="filterClick(filter, +1)"
              @mouseup="filterRelease()"
            >
              <font-awesome-icon icon="circle-plus" />
            </div>
          </div>
        </div>
      </div>

      <div class="services">
        <div v-for="service in store.services">
          <div
            class="service"
            :class="{ active: service.active }"
            @click="service.active = !service.active"
          >
            <div>{{ service.name }}</div>
            <font-awesome-icon :icon="service.icon" />
          </div>
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
  methods: {
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
  max-width: 600px;
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 500ms;
  opacity: 0;

  &.active {
    top: 50%;
    opacity: 1;
  }
  .search-options {
    display: flex;

    .filters,
    .services {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 20px;
      padding: 10px;
      margin: 10px;
      width: 100%;
    }

    .filters {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 30px;

      // & > * {
      //   padding: 10px 0;
      // }

      .filter {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        padding: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        // & > * {
        //   padding: 16px 32px;
        // }

        .filter-value {
          font-size: 18px;
          width: 80px;
          color: rgb(48, 48, 48);
        }

        .filter-button {
          color: rgb(73, 218, 174);
          cursor: pointer;
          user-select: none;
          font-size: 22px;
          // border-radius: 50%;
          // aspect-ratio: 1;
          // width: 30px;
          // padding: 20px;
          // overflow: hidden;

          &:hover {
            color: rgb(18, 112, 86);
          }
        }
      }

      .filter-label {
        margin-bottom: 4px;
      }
    }

    .services {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
      font-size: 15px;

      .service {
        color: grey;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // width: 140px;
        padding: 6px 14px;
        border-radius: 30px;
        transition: 200ms all;
        cursor: pointer;
        outline: 1px solid rgba(0, 0, 0, 0.1);

        &:hover {
          background-color: rgb(216, 252, 249);
        }

        &.active {
          outline: 3px solid $primary;
          box-shadow: 2px 5px 18px rgba(0, 0, 0, 0.2);
        }
      }
    }

    // .filter,
    // .service {
    //   box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
    // }
  }

  .filter-controls {
    display: flex;
    gap: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;

    & :first-child {
      flex-grow: 2;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
    }

    & :last-child {
      flex-grow: 1;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
