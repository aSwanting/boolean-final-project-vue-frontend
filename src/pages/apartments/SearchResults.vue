<template>
    <DefaultLayout>
        <div class="wrapper">
            <div v-if="apartments[0]" class="container">
                <div class="card-wrapper">
                    <ApartmentCard class="apartment-card" v-for="apartment in apartments" :apartment="apartment">
                        <Carousel :apartment="apartment" />
                    </ApartmentCard>
                </div>
            </div>
            <div v-else-if="showLoader == false" class="no-apt">
                <p>There are no apartments with the selected values!</p>
                <router-link class="btn-primary" :to="{ name: 'home' }">
                    Home
                </router-link>
            </div>
            <Loading v-show="showLoader == true"></Loading>
        </div>
    </DefaultLayout>
</template>

<script>
import store from '../../store'
import axios from 'axios'
import ApartmentCard from '../../components/ApartmentCard.vue'
import Carousel from "../../components/Carousel.vue"
import Loading from "../../components/Loading.vue"
import DefaultLayout from '../../layouts/DefaultLayout.vue'
export default {
    components: {
        ApartmentCard,
        Carousel,
        Loading,
        DefaultLayout
    },
    data() {
        return {
            store,
            apartments: [],
            showLoader: '',
        }
    },
    methods: {
        fetchResults() {
            axios.get('http://127.0.0.1:8000/api/apartments/results/').then(res => {
                this.apartments = res.data.results;

                this.showLoader = false;
            });
        },
        async getApartments() {
            this.showLoader = true;
            this.fetchResults();
        }
    },
    beforeMount() {
        this.getApartments();
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    min-height: 100px;
}

.container {
    max-width: 1200px;
    padding: 50px;
    height: 100%;
}

.card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 25px;

    .apartment-card {
        cursor: pointer;
    }
}

.no-apt {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn-primary {
        flex-shrink: 1;
    }
}
</style>