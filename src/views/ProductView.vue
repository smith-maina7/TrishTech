<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import type { Products } from '@/types/products'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const id = Number(route.params.id)
const loading = ref(false)
const error = ref<string | null>(null)
const product = ref<Products | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    const data = await productStore.fetchProduct(id)
    product.value = data as Products
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    error.value = message
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (product.value) cartStore.addItem(product.value)
}
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-10">
    <div v-if="loading" class="text-center py-20">Loading product...</div>
    <div v-else-if="error" class="rounded p-6 bg-red-50 text-red-700">{{ error }}</div>
    <div v-else-if="product" class="rounded-3xl bg-white p-8 shadow-sm grid gap-6 md:grid-cols-2">
      <div class="flex items-center justify-center bg-slate-50 p-6 rounded-2xl">
        <img :src="product.image" :alt="product.title" class="max-h-96 object-contain" />
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {{ product.category }}
        </p>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900">{{ product.title }}</h1>
        <p class="mt-4 text-slate-600">{{ product.description }}</p>
        <div class="mt-6 flex items-center gap-4">
          <span class="text-2xl font-bold text-slate-900">${{ product.price.toFixed(2) }}</span>
          <button
            @click="addToCart"
            class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Add to cart
          </button>
          <button
            @click="router.back()"
            class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-slate-500 py-20">Product not found.</div>
  </main>
</template>

<style scoped></style>
