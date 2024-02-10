<template>
    <DefaultLayout>
        <div class="container" v-if="apartment.name">
            <figure>
                <img class="cover-img" :src="`${BASE_URL_COVER_IMG}${apartment.cover_image}`" alt="">
            </figure>
            <div class="container-images">
                <img class="images" v-for="img in apartment.images " :key="img.id" :src="`${BASE_URL_IMAGES}${img.link}`">
            </div>
            <div class="apartment-info">
                <h3>{{ apartment.name }}</h3>
                <p>{{ apartment.address }}, {{ apartment.country }}</p>
                <p>{{ apartment.description }}</p>
                <p v-show="apartment.distance">{{ apartment.distance }} Km away</p>
                <div class="services">
                    <div class="col-2" v-for="service in apartment.services" :key="service.id">{{ service.name }}</div>
                </div>
            </div>

        </div>
        <Loading v-else></Loading>
    </DefaultLayout>
</template>
<script>
import axios from 'axios'
import DefaultLayout from '../../layouts/DefaultLayout.vue'
import Loading from '../../components/Loading.vue'
import store from '../../store'

export default {
    components: {
        DefaultLayout,
        Loading
    },
    props: {
        slug: String,
    },
    data() {
        return {
            store,
            apartment: store.currentApartment,
            BASE_URL: 'http://127.0.0.1:8000/api',
            BASE_URL_COVER_IMG: 'http://127.0.0.1:8000/storage/cover_images/',
            BASE_URL_IMAGES: `http://127.0.0.1:8000/storage/images/`,
        }
    },
    methods: {
        fetchApartment() {
            axios.get(`${this.BASE_URL}/apartments/${this.slug}`).then(res => {
                this.apartment = res.data.apartment

            })
        },
        test1() {
            if (!this.apartment.name) {
                this.fetchApartment()
            }
        }
    },
    created() {
        // this.fetchApartment()
        this.test1();
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
.container {
    max-width: 800px;
    margin: 0 auto;
}

.container-images {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.cover-img {
    display: block;
    width: 100%;
    margin: 16px 0;
}

.images {
    max-width: 150px;
    display: block;
}

.services {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.col-2 {
    flex-basis: calc(100% / 6);
}

.apartment-info {
    padding: 12px;

    * {
        margin: 8px 0;
    }
}
</style>