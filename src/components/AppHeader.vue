<template>
  <header>
    <div class="container">
      <nav class="nav-menu">
        <ul class="d-flex nav-items  ">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }">boolbnb</router-link>
          </li>
          <li class="nav-item">
          </li>
          <div class="btn-group dropdown-padding">
            <button class="btn btn-secondary btn-sm dropdown-toggle button-color" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <a v-bind:href="BACKEND_URL"><font-awesome-icon icon="user" /></a>
            </button>
            <ul class="dropdown-menu">
              <li class="p-2"> <a v-bind:href="BACKEND_URL_LOGIN">Login</a>
              </li>
              <!-- <li>
                <hr>
              </li> -->
              <li class="p-2"> <a v-bind:href="BACKEND_URL_REGISTER">Register</a>
              </li>
            </ul>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      BACKEND_URL: "http://127.0.0.1:8000/",
      BACKEND_URL_LOGIN: "http://127.0.0.1:8000/login",
      BACKEND_URL_REGISTER: "http://127.0.0.1:8000/register",
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
  justify-content: space-between;
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

.dropdown-padding {
  padding: 15px;

  .button-color {
    background-color: white !important;
    border-color: white;
    color: black;
  }
}

ul {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

li:first-child {
  border-bottom: 1px grey solid;
}
</style>
