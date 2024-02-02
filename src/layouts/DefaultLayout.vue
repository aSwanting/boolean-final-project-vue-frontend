<template>
    <AppHeader />

    <slot></slot>

    <footer>

    </footer>

</template>
<script>
import AppHeader from '../components/AppHeader.vue'
export default {
    components: {
        AppHeader
    }
}
</script>
<style lang="scss" scoped>

</style>