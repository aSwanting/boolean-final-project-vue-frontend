<template>
    <AppHeader />

    <main>
        <slot></slot>
    </main>
    

    <footer>
        <h1>Footerone</h1>
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