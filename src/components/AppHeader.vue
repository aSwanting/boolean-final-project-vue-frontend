<template>
    <ul class="d-flex">
        <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'apartments.index' }">Apartments</router-link>
        </li>

    </ul>
</template>
    
<script>
</script>
<style lang="scss" scoped>
.d-flex {
    display: flex;
    justify-content: center;
    column-gap: 260px;
}
</style>