<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/product'

const store = useProductStore()

onMounted(() => {
  store.fetchProduct().catch(() => {
    /* handled in store.error */
  })
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Product List</h1>

    <div v-if="store.loading" class="mt-4">Loading...</div>

    <div v-if="store.error" class="mt-4 text-red-600">Error: {{ store.error }}</div>

    <ul v-if="!store.loading && !store.error" class="mt-4 space-y-3">
      <li v-for="p in store.products" :key="p.id" class="rounded border p-3 bg-white">
        <div class="flex items-center gap-4">
          <img :src="p.image" alt="" class="h-12 w-12 object-cover" />
          <div>
            <div class="font-medium">{{ p.title }}</div>
            <div class="text-sm text-slate-500">${{ p.price }}</div>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="!store.products.length && !store.loading" class="mt-4 text-slate-600">No products found.</div>
  </div>
</template>

<style scoped></style>
