<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
// Imports
import search from './components/search.vue';
import showResults from './components/showResults.vue';
import header from './components/header.vue';

export default {
    components: {
        'Search': search,
        'show-resuts': showResults,
        'app-header': header
    },
    methods: {

    }
}
</script>

<style>
body{
    margin: 0;
    font-family: 'Nunito SemiBold';
}
</style>
