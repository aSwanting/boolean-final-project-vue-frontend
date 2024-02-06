<template>
    <Layout>
        <div v-if="apartment" class="container">
            <div class="section">
                <!-- <div>
                    <figure>
                        <img :src="apartment.cover_image" alt="">
                    </figure>

                </div> -->
                <h1 class="section-title">{{ apartment.name }}</h1>
                <div>
                    <p>{{ apartment.description }}</p>
                    <p>{{ apartment.address }}</p>
                    <p>Rooms: {{ apartment.rooms }}</p>
                    <p>Beds: {{ apartment.beds }}</p>
                    <p>Bathroom: {{ apartment.bathrooms }}</p>
                    <p>Square meters: {{ apartment.square_meters }}</p>
                    <ul class="services">
                        <li v-for="(service, i) in apartment.services" :key="apartment.id">
                            {{ service.name }}
                        </li>
                    </ul>
                </div>

                <div>
                    <!-- <figure v-for="(image, i) in apartment.images" :key="apartment.id">
                    <img :src="image.link" alt="">
                </figure> -->
                </div>
            </div>
        </div>
        <Loading v-else></Loading>
    </Layout>
</template>
<script>
import axios from 'axios'
// import Section from '../../components/Section.vue'
import Layout from '../../layouts/DefaultLayout.vue'
import Loading from '../../components/Loading.vue'

export default {
    components: {
        // Section,
        Layout,
        Loading
    },
    props: {
        slug: String
    },
    data() {
        return {
            apartment: null,
            BASE_URL: 'http://127.0.0.1:8000/api'
        }
    },
    methods: {
        fetchApartment() {
            axios.get(`${this.BASE_URL}/apartments/${this.slug}`).then(res => {
                console.log(res.data)
                this.apartment = res.data.apartment

            })
        }
    },
    created() {
        this.fetchApartment()
    },
    mounted() {
        console.log('show montata')
    },
    unmounted() {
        console.log('show unmounted')
    }

}

</script>
<style lang="scss" scoped>
.section-title {
    text-align: center;
    margin-bottom: 20px;
}

.section {
    margin: 60px 0;
}

.strong {
    font-weight: bold;
}
</style>