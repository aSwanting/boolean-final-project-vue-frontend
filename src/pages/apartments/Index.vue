<template>
    <!--  -->
    <DefaultLayout>
        <div class="container">
            <h2 class="text-center">
                Apartments
            </h2>
        </div> 
        <div class="container">
            <div class="grid">
                <ApartmentCard class="card apartment-card" 
                v-for="apartment in apartments" :apartment="apartment" :key="apartment.id"/>
            </div>
        </div>
        <Loading v-if="apartments.length < 1"></Loading>
        
    </DefaultLayout>
    <!-- <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug }}">{{ apartment.description }}</router-link> -->
</template>

<script>
import axios from 'axios';
import Loading from '../../components/Loading.vue'
import DefaultLayout from '../../layouts/DefaultLayout.vue'
import ApartmentCard from '../../components/ApartmentCard.vue'
export default {
    components: {
        Loading,
        DefaultLayout,
        ApartmentCard
    },
    data() {
        return {
            apartments: [],
            BASE_URL: 'http://127.0.0.1:8000/api'
        }
    },
    methods: {
        fetchApartments() {
            axios.get(`${this.BASE_URL}/apartments`)
                .then((res) => {
                    // console.log(res.data)
                    this.apartments = res.data.results
                })
        }
    },
    created() {
        this.fetchApartments()
    },
    mounted() {
        console.log('apartments.index montato')
    },
    unmounted() {
        console.log('apartments.index unmount')
    }
}
</script>

<style lang="scss" scoped></style>