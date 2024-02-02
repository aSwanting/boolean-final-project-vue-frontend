<template>
    <div>
        <h2 class="text-center">Apartments</h2>
        <table class="table" v-if="apartments.length >= 1">

            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Rooms</th>
                    <th scope="col">Beds</th>
                    <th scope="col">Square meters</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="apartment in apartments" :key="apartment.id">
                    <th scope="row">{{ apartment.id }}</th>
                    <td>{{ apartment.description }}</td>
                    <td>{{ apartment.rooms }}</td>
                    <td>{{ apartment.beds }}</td>
                    <td>{{ apartment.square_meters }}</td>
                </tr>
            </tbody>
        </table>
        <Loading v-else></Loading>
    </div>
</template>

<script>
import axios from 'axios';
import Loading from '../../components/Loading.vue'
export default {
    components: {
        Loading
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
                    console.log(res.data)
                    this.apartments = res.data.results
                })
        }
    },
    created() {
        this.fetchApartments()
    }
}
</script>

<style lang="scss" scoped></style>