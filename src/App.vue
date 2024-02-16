<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style lang="scss">
@use "./styles/general.scss" as *;
#app {
  display: flex;
  flex-direction: column;
  &:last-child {
    flex-grow: 1;
  }
}
</style>
