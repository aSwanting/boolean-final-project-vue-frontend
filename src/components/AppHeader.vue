<template>
  <header>
    <nav class="nav-menu">
      <ul class="d-flex nav-items">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>

        <li class="nav-item">
          <a v-bind:href="BACKEND_URL">User Area</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      BACKEND_URL: "http://127.0.0.1:8000/",
    };
  },
};
</script>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
header {
  border-bottom: 1px solid $primary;
}

.d-flex {
  display: flex;
  justify-content: center;
}

.nav-items {
  //   font-size: 20px;
  //   padding: 20px 0;
  .nav-item {
    a {
      display: block;
      padding: 20px 50px;
      transition: 200ms all;
      &:hover {
        background-color: $primary-hover;
      }
    }
  }
}
</style>
