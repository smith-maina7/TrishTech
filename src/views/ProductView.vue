<script setup>
import { useRoute } from 'vue-router'
import products from '/src/computer.json'

const route = useRoute()
const id = parseInt(route.params.id)
const product = products.find((product) => product.id === id)
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>Type: {{ product.type }}</p>

    <h2>Variations:</h2>
    <ul>
      <li v-for="variation in product.variations" :key="variation.model">
        Model: {{ variation.model }}, RAM: {{ variation.ram }}, Storage: {{ variation.storage }}
      </li>
    </ul>

    <h2>Reviews:</h2>
    <ul>
      <li v-for="review in product.reviews" :key="review.reviewId">
        Rating: {{ review.rating }} - Comment: "{{ review.comment }}"
      </li>
    </ul>
  </div>

  <p v-else>Product not found</p>
</template>
