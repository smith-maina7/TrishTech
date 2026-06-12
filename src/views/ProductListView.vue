<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import type { Products } from '@/types/products'

const store = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

const addedItems = ref<Set<number>>(new Set())
const selectedCategory = ref('All')
const showCatModal = ref(false)

function selectCategoryAndClose(cat: string) {
  selectCategory(cat)
  showCatModal.value = false
}

const categories = computed(() => {
  const cats = new Set<string>()
  store.products.forEach((p) => cats.add(p.category))
  return ['All', ...Array.from(cats)]
})

const filteredProducts = computed(() => {
  const term = (store.searchTerm || '').trim().toLowerCase()
  let list =
    selectedCategory.value === 'All'
      ? store.products
      : store.products.filter((p) => p.category === selectedCategory.value)

  if (!term) return list

  return list.filter((p) => {
    const title = (p.title || '').toLowerCase()
    const desc = (p.description || '').toLowerCase()
    const category = (p.category || '').toLowerCase()
    return title.includes(term) || desc.includes(term) || category.includes(term)
  })
})

onMounted(() => {
  store.fetchProduct().catch(() => {
    /* handled in store.error */
  })
})

function addToCart(product: Products) {
  cartStore.addItem(product)
  addedItems.value.add(product.id)
  setTimeout(() => {
    addedItems.value.delete(product.id)
  }, 1500)
}

function selectCategory(cat: string) {
  selectedCategory.value = cat
}

function goToProduct(id: number) {
  router.push({ name: 'product', params: { id } })
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight text-slate-900">Explore Collection</h1>
        <p class="mt-2 text-sm text-slate-500">
          Discover our range of premium workspace tools, accessories, and audio essentials.
        </p>
      </div>
    </div>

    <!-- Category navigation -->
    <div class="mt-6">
      <!-- Desktop / large screens -->
      <nav class="hidden sm:flex gap-2 overflow-x-auto py-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          :aria-pressed="selectedCategory === cat"
          class="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition"
          :class="
            selectedCategory === cat
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          "
        >
          {{ cat }}
        </button>
      </nav>

      <!-- Mobile: open bottom sheet -->
      <div class="sm:hidden flex items-center gap-2">
        <button
          @click="showCatModal = true"
          class="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          :aria-expanded="showCatModal"
        >
          Categories
        </button>
      </div>
    </div>

    <!-- Mobile bottom-sheet modal -->
    <div v-if="showCatModal" class="fixed inset-0 z-50 flex items-end sm:hidden">
      <div class="absolute inset-0 bg-black/40" @click="showCatModal = false"></div>
      <div
        class="relative w-full rounded-t-2xl bg-white p-4 shadow-lg"
        style="max-height: 70vh; overflow: auto"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Categories</h3>
          <button @click="showCatModal = false" class="text-slate-500">Close</button>
        </div>
        <div class="mt-4 grid gap-2 grid-cols-2">
          <button
            v-for="cat in categories"
            :key="cat + '-m'"
            @click="selectCategoryAndClose(cat)"
            :class="
              selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            "
            class="rounded-full px-4 py-2 text-sm font-medium"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="store.loading" class="mt-12 rounded-3xl bg-white p-16 text-center shadow-sm">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
      ></div>
      <p class="mt-4 text-slate-500 font-medium">Curating products for you...</p>
    </div>

    <div
      v-if="store.error"
      class="mt-12 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
    >
      <p class="font-semibold">Unable to load collection</p>
      <p class="mt-1 text-red-600/90">{{ store.error }}</p>
    </div>

    <!-- Product Grid -->
    <div v-if="!store.loading && !store.error" class="mt-10">
      <div
        v-if="store.products.length"
        class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <article
          v-for="p in filteredProducts"
          :key="p.id"
          @click="goToProduct(p.id)"
          class="relative cursor-pointer group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="relative overflow-hidden bg-slate-100 p-6">
            <img
              :src="p.image"
              :alt="p.title"
              class="h-52 w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span
              class="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 shadow-sm"
            >
              {{ p.category }}
            </span>
          </div>

          <div class="space-y-3 p-6">
            <h3
              class="font-semibold text-slate-950 line-clamp-1 group-hover:text-indigo-600 transition-colors"
            >
              {{ p.title }}
            </h3>
            <p class="text-sm leading-6 text-slate-600 line-clamp-2">
              {{ p.description }}
            </p>

            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <span class="text-lg font-bold text-slate-900">${{ p.price.toFixed(2) }}</span>
              <button
                @click.stop="addToCart(p)"
                class="rounded-full px-4 py-2 text-sm font-medium transition duration-200 shadow-sm"
                :class="
                  addedItems.has(p.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5'
                "
              >
                {{ addedItems.has(p.id) ? 'Added! ✓' : 'Add to cart' }}
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center"
      >
        <p class="text-4xl">📦</p>
        <h3 class="mt-4 text-lg font-semibold text-slate-950">No products found</h3>
        <p class="mt-2 text-sm text-slate-500">
          We couldn't find any products in our collection right now.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
