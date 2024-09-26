<script setup>
import { useRoute } from 'vue-router'
import sportsData from '/src/sports.json'

const route = useRoute()
const sportId = parseInt(route.params.sportId)
const countryId = parseInt(route.params.countryId)

// Find the sport
const sport = sportsData.sports.find((s) => s.id === sportId)

// Find the country inside the sport
const country = sport ? sport.countries.find((c) => c.id === countryId) : null

// Get the leagues (divisions) inside the country
const leagues = country ? country.divisions : []
</script>

<template>
  <div v-if="country">
    <h2>Leagues in {{ country.name }}</h2>
    <ul>
      <li v-for="league in leagues" :key="league.id">
        <router-link
          :to="{
            name: 'matchDay',
            params: { sportId: sport.id, countryId: country.id, leagueId: league.id }
          }"
          >{{ league.name }}</router-link
        >
      </li>
    </ul>
  </div>
  <div v-else>No country found</div>
</template>
