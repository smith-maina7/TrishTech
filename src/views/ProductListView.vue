<script setup>
import products from '/src/computer.json' // Adjust the path if needed
</script>

<template>
  <div>
    <h1>Product List Page</h1>
    <ul>
      <!-- Dynamically generate product links -->
      <li v-for="product in products" :key="product.id">
        <!-- Corrected RouterLink with dynamic params -->
        <RouterLink :to="{ name: 'product', params: { id: product.id } }">
          {{ product.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
