<script>
export default {
  data() {
    return {
      BACKEND_URL: "http://127.0.0.1:8000/",
    };
  },
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="text-center p-2 mb-0">
        <p class="title-footer">BoolBnb made by Team 1, Boolean class 106</p>
        <div class="list-creator mt-0 justify-content-between">
          <a
            href="https://github.com/aSwanting"
            target="_blank"
            class="name-creator"
          >
            <font-awesome-icon class="me-2" :icon="['fab', 'github']" />
            <span>Gabriel D'Amico</span>
          </a>
          <a
            href="https://github.com/ValerioCarbone"
            target="_blank"
            class="name-creator"
            ><font-awesome-icon class="me-2" :icon="['fab', 'github']" />
            <span>Valerio Carbone</span>
          </a>
          <a
            href="https://github.com/EmanueleVenditti95"
            target="_blank"
            class="name-creator"
            ><font-awesome-icon class="me-2" :icon="['fab', 'github']" />
            <span>Emanuele Venditti</span>
          </a>
          <a
            href="https://github.com/w3bd3v3lop3rNico"
            target="_blank"
            class="name-creator"
            ><font-awesome-icon class="me-2" :icon="['fab', 'github']" />
            <span>Nicola Tabai</span>
          </a>
          <a
            href="https://github.com/karimdib"
            target="_blank"
            class="name-creator"
            ><font-awesome-icon class="me-2" :icon="['fab', 'github']" />
            <span>Karim Dib</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

footer {
  color: grey;
  font-size: 10px;
  border-top: 2px solid $primary;
  .title-footer {
    margin: 0;
  }
  .list-creator {
    display: none;
  }
}
@media (min-width: 768px) {
  footer {
    font-size: 12px;
    border-top: 2px solid $primary;
    padding: 10px;

    .title-footer {
      margin-bottom: 10px;
    }
    .list-creator {
      display: flex;
    }
  }
}
// .title-footer {
//   font-size: 14px;
//   font-style: italic;
//   color: grey;
// }

// .footer {
//   // min-height: 75px;
//   // margin-top: 50px;
//   // font-style: italic;
//   font-weight: 400;
//   font-size: 14px;
//   padding: 8px;
// }

// .list-creator > a:hover {
//   color: $primary-hover;
// }

// .made-by {
//   font-weight: bold;
// }

// .status {
//   // padding: 0px 10px;
// }

// @media (min-width: 768px) {
//   .footer {
//     font-size: 14px;
//   }
// }
</style>
