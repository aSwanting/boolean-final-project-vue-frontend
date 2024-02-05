<template>
    <ul class="d-flex nav-items">
        <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'apartments.index' }">Apartments</router-link>
        </li>
        <li>
            <a v-bind:href="BACKEND_URL">User Area</a>
        </li>

    </ul>
</template>
    
<script>
export default {
    data() {
        return {
            BACKEND_URL: 'http://127.0.0.1:8000/',
        }
    }
}
</script>
<style lang="scss" scoped>
.d-flex {
    display: flex;
    justify-content: space-evenly;
}

.nav-items {
    font-size: 20px;
    padding: 12px 0;
}
</style>