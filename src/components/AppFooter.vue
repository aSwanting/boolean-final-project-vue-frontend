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
  <footer>
    <div class="row gap-2 ">
      <div class="col-4">
        <ul>
          <li>Chi Siamo</li>
          <li>Contatti</li>
          <li>Pubblica il tuo annuncio</li>
          <li>Lavora con noi</li>
        </ul>
      </div>
      <div class="col-4">
        <ul>
          <li>Termini di utilizzo</li>
          <li>Normativa sulla privacy e sui cookie</li>
          <li>Appartamenti vicino a me </li>
          <li>Domande Frequenti</li>
        </ul>
      </div>
      <div class="col-4">
        <div>Seguici su</div>
        <ul class="d-flex gap-3">
          <li><font-awesome-icon :icon="['fab', 'facebook']" /></li>
          <li><font-awesome-icon :icon="['fab', 'instagram']" /></li>
          <li><font-awesome-icon :icon="['fab', 'github']" /></li>
          <li><font-awesome-icon :icon="['fab', 'telegram']" /></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
</style>
