<template>
    <div class="container">
        <div class="card-wrapper">
            <ApartmentCard class="apartment-card" v-for="apartment in apartments" :apartment="apartment"
                @click="store.currentApartment = apartment">
            </ApartmentCard>
        </div>
    </div>
</template>

<script>
import store from '../../store'
import axios from 'axios'
import ApartmentCard from '../../components/ApartmentCard.vue'
export default {
    components: {
        ApartmentCard
    },
    data() {
        return {
            store,
            apartments: [],
        }
    },
    methods: {
        fetchResults() {
            axios.get('http://127.0.0.1:8000/api/apartments/results/').then(res => {
                this.apartments = [];
                this.apartments = res.data.results;
                console.log(res.data.results);
            });
        },
        async getApartments() {
            if (store.lat) {
                let response;
                this.data = {
                    search_radius: store.filters[0].value,
                    rooms: store.filters[1].value,
                    beds: store.filters[2].value,
                    bathrooms: store.filters[3].value,
                    latitude: store.lat,
                    longitude: store.long,
                    services: store.services
                        .filter((service) => service.active)
                        .map((service) => service.key),
                };

                response = await axios.post(
                    `${store.BACKEND_URL}api/apartments`,
                    this.data
                );
                console.log(response.data.results);
                this.apartments = response.data.results.apartments
            } else {
                this.fetchResults();
            }
        }
    },
    created() {
        this.getApartments();
    }
}
</script>

<style lang="scss" scoped>
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
</style>