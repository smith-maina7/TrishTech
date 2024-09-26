<script setup>
import sportsData from '/src/sports.json'
</script>

<template>
  <h2>Sports view page</h2>
  <ul>
    <li v-for="sport in sportsData.sports" :key="sport.id">
      <router-link :to="{ name: 'sport', params: { id: sport.id } }">
        {{ sport.name }}
      </router-link>
    </li>
  </ul>
</template>
