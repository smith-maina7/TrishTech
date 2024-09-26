<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/product-list">Product List</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
