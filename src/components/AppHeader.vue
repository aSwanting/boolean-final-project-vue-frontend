<template>
  <header>
    <div class="container">
      <nav class="nav-menu d-flex justify-content-between align-items-center">
        <!-- Nav Left -->
        <router-link class="logo-anchor" :to="{ name: 'home' }">
          <img class="logo" src="/BoolBnb.png" /></router-link>

        <!-- Nav Right -->
        <div class="nav-dropdown dropdown">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <font-awesome-icon icon="user" />
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item custom" :href="store.BACKEND_URL">User Area</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

header {
  border-bottom: 3px solid $primary;

  .logo-anchor {
    padding: 18px;
    transition: 200ms all;

    &:hover {
      background-color: rgba(10, 170, 90, 0.096);
    }

    .logo {
      max-width: 160px;
    }
  }

  .nav-dropdown {
    ul {
      padding: 0;
      overflow: hidden;

      li {
        a {
          padding: 6px;
          text-align: center;
          transition: 200ms all;

          &:hover {
            background-color: $primary;
          }
        }
      }
    }
  }
}
</style>
