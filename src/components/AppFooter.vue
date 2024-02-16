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
  <footer class="footer">
    <div class="container">
      <div class="text-center p-2">
        <h5 class="title-footer">Boolbnb Team-1 Boolean</h5>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.footer {
  border-top: 2px solid #8ee9ce;
  padding: 50px;
  margin-top: 50px;
}
</style>
