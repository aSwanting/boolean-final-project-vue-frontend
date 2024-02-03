<template>
    <DefaultLayout>
        <div>
            <h1>{{ title }}</h1>
            <h3>{{ description }}</h3>

        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
export default {
    components: {
        DefaultLayout
    },
    data() {
        return {
            title: 'BoolBnB',
            description: 'Questo è un sito bellissimo'
        }
    },
    mounted() {
        console.log('home page montata')
    },
    unmounted() {
        console.log('unmount home page')
    }

}
</script>

<style lang="scss" scoped></style>