<template>
  <footer>Footer</footer>
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
footer {
  border-top: 1px solid $primary;
  text-align: center;
  padding: 20px;
}
</style>
