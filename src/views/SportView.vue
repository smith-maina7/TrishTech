<script setup>
import { useRoute } from 'vue-router'
import sportsData from '/src/sports.json'

const route = useRoute()
const sportId = parseInt(route.params.id)
const sport = sportsData.sports.find((s) => s.id === sportId)
</script>

<template>
  <div v-if="sport">
    <h1>{{ sport.name }}</h1>
    <ul>
      <li v-for="country in sport.countries" :key="country.id">
        <router-link :to="{ name: 'league', params: { sportId: sport.id, countryId: country.id } }">
          {{ country.name }}
        </router-link>
      </li>
    </ul>
  </div>
  <div v-else>no sport found</div>
</template>
