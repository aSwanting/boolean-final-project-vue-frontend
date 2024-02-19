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
        <p class="title-footer mb-1">
          BoolBnb made by Team 1, Boolean class 106 :
        </p>
        <div class="list-creator mt-0 d-flex justify-content-between">
          <a
            href="https://github.com/aSwanting"
            target="_blank"
            class="name-creator"
          >
            <div>Gabriel D'Amico</div>
          </a>
          <a
            href="https://github.com/ValerioCarbone"
            target="_blank"
            class="name-creator"
          >
            <div>Valerio Carbone</div>
          </a>
          <a
            href="https://github.com/EmanueleVenditti95"
            target="_blank"
            class="name-creator"
          >
            <div>Emanuele Venditti</div>
          </a>
          <a
            href="https://github.com/w3bd3v3lop3rNico"
            target="_blank"
            class="name-creator"
          >
            <div>Nicola Tabai</div>
          </a>
          <a
            href="https://github.com/karimdib"
            target="_blank"
            class="name-creator"
          >
            <div>Karim Dib</div>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.footer {
  border-top: 2px solid #8ee9ce;
  min-height: 75px;
  margin-top: 50px;
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
}

.list-creator > a:hover {
  color: $primary-hover;
}

.made-by {
  font-weight: bold;
}

.status {
  padding: 0px 10px;
}

@media (min-width: 768px) {
    .footer {
        font-size : 18px;
    }
  }    
</style>
