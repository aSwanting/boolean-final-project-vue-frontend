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
  <footer class="ff">
    <div class="container">
      <div class="row  justify-content-between flex-wrap  flex-md-nowrap">
        <div class="col-md-4 col-6">
          <ul>
            <a href="#">
              <li>Chi Siamo</li>
            </a>
            <a href="#">
              <li>Contatti</li>
            </a>
            <a href="#">
              <li>Pubblica il tuo annuncio</li>
            </a>
            <a href="#">
              <li>Lavora con noi</li>
            </a>
          </ul>
        </div>
        <div class="col-md-4 col-6">
          <ul>
            <a href="#">
              <li>Termini di utilizzo</li>
            </a>
            <a href="#">
              <li>Normativa sulla privacy e sui cookie</li>
            </a>
            <a href="#">
              <li>Appartamenti vicino a me </li>
            </a>
            <a href="#">
              <li>Domande Frequenti</li>
            </a>
          </ul>
        </div>
        <div class="col-md-4 col-12  text-center icon-col ">
          <ul>
            <a href="#">
              <li class="icon">Seguici su:</li>
            </a>
          </ul>
          <ul class="d-flex gap-3  justify-content-center justify-content-md-between p-0">
            <a href="#">
              <li class="icon"><font-awesome-icon :icon="['fab', 'facebook']" /></li>
            </a>
            <a href="#">
              <li class="icon"><font-awesome-icon :icon="['fab', 'instagram']" /></li>
            </a>
            <a href="#">
              <li class="icon"><font-awesome-icon :icon="['fab', 'github']" /></li>
            </a>
            <a href="#">
              <li class="icon"><font-awesome-icon :icon="['fab', 'telegram']" /></li>
            </a>
          </ul>
        </div>
        <!-- <div class="col-12">
          <img class="city-image" src="/public/cityy.png" alt="">
        </div> -->
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.ff {
  border-top: 1px solid $primary;
  padding: 20px;
  margin-top: 20px;
  background-color: white;
  font-size: 13px;
  font-weight: 600;


  ul {
    padding-left: 0px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;

    .row {
      flex-wrap: nowrap;

      a>li {
        padding: 10px;

        &:hover {
          box-shadow: inset 0px 0px 5px rgba(30, 233, 149, 0.836);

        }
      }

      .icon {
        font-size: 16px;
      }
    }
  }


}
</style>
