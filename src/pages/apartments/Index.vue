<template>
    <div>
        <h2 class="text-center">Apartments</h2>
        <table class="table">

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
    </div>
</template>

<script>
import axios from 'axios';
export default {
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