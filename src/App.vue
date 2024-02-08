<template>
  <router-view></router-view>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>
