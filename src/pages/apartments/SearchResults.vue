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
                this.apartments = res.data.results;
                console.log(res.data.results);
            });
        }
    },
    created() {
        this.apartments = [];
    },
    mounted() {
        this.fetchResults();
    },
    // updated() {
    //     this.fetchResults();
    // }
    // updated() {
    //     console.log(store.addressList),
    //         this.apartments = store.addressList
    // }
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