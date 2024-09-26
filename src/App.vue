<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'productList' }">Product List</RouterLink>
    <RouterLink :to="{ name: 'sports' }">Sports</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
