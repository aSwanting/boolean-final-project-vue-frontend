<template>
    <div>
        <h1>{{ apartment.description }}</h1>
    </div>

    <div>
        <!-- <figure>
            <img :src="apartment.cover_image" alt="">
        </figure> -->
       
        <!-- <ul class="services">
            <li v-for="(service, i) in apartment.services" :key="apartment.id">
                <h3>
                    {{ service.name }}
                </h3>
            </li>
        </ul> -->
    </div>
    <div>
        <!-- <figure v-for="(image, i) in apartment.images" :key="apartment.id">
            <img :src="image.link" alt="">
        </figure> -->
    </div>
</template>
<script>
import axios from 'axios'
import Section from '../../components/Section.vue'

export default {
    components: {
        Section,
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
<style></style>