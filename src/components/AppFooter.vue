<script>
export default {
  data() {
    return {
      BACKEND_URL: "http://127.0.0.1:8000/",
    };
  },
};
</script>

<template >
  <footer class="footer container">
    <div class="">
      <div class="text-center p-2">
        <h5 class="title-footer">Boolbnb Team-1 Boolean</h5>
        <div class="made-by">Made By:</div>
      </div>
      <div class=" list-creator  mt-4 d-flex justify-content-between d-none  gap-2 ">
        <a href="https://github.com/aSwanting" target="_blank" class="name-creator">
          <div>Gabriel</div>
        </a>
        <a href="https://github.com/ValerioCarbone" target="_blank" class="name-creator">
          <div>Valerio</div>
        </a>
        <a href="https://github.com/EmanueleVenditti95" target="_blank" class="name-creator">
          <div>Emanuele</div>
        </a>
        <a href="https://github.com/w3bd3v3lop3rNico" target="_blank" class="name-creator">
          <div>Nicola</div>
        </a>
        <a href="https://github.com/karimdib" target="_blank" class="name-creator">
          <div>Karim</div>
        </a>
      </div>
    </div>

  </footer>
</template>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.footer {
  border-top: 2px solid #8ee9ce;
  padding: 25px;
  margin-top: 50px;
}


.made-by {
  font-weight: bold;
}

.status {
  padding: 0px 10px;
}

.footer:hover {
  .list-creator {
    display: block !important;
    display: flex !important;
    font-size: 14px;

    .name-creator {
      font-weight: bold;
    }
  }


}
</style>
