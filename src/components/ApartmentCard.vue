<template>
    <div class="card apartment-card">
        <h3>{{ apartment.description }}</h3>
        <figure>
            <img :src="apartment.cover_image" alt="">
        </figure>

        <p v-if="apartment.user">
            {{ apartment.user.first_name }}
        </p>

        <router-link 
        :to="{ name: 'apartments.show', params: { slug: apartment.slug}}">
            Vedi Appartamento
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        apartment: {
            type: Object,
            required: true
        }
    }
}
</script>
<style></style>