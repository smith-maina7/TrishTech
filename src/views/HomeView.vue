<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import type { Products } from '@/types/products'

const store = useProductStore()
const cartStore = useCartStore()

const addedItems = ref<Set<number>>(new Set())

onMounted(() => {
  store.fetchProduct().catch(() => {
    /* handled in store.error */
  })
})

const featuredProducts = computed(() => store.products.slice(0, 4))

function addToCart(product: Products) {
  cartStore.addItem(product)
  addedItems.value.add(product.id)
  setTimeout(() => {
    addedItems.value.delete(product.id)
  }, 1500)
}
</script>

<template>
  <main class="space-y-16 bg-slate-50 text-slate-900">
    <section
      class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-700 text-white"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.35),_transparent_35%)]"
        aria-hidden="true"
      ></div>
      <div
        class="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="max-w-2xl lg:pr-12">
          <p
            class="rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-slate-200"
          >
            New arrivals 2026
          </p>
          <h1 class="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Elevate your everyday with modern tech essentials.
          </h1>
          <p class="mt-6 max-w-xl text-base leading-8 text-slate-200/90 sm:text-lg">
            Discover curated products for work, home, and leisure. Fast shipping, easy returns, and
            smart picks for the way you live.
          </p>
          <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RouterLink
              class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
              :to="{ name: 'productList' }"
            >
              Shop the collection
            </RouterLink>
            <RouterLink
              class="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              :to="{ name: 'productList' }"
            >
              Browse products
            </RouterLink>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:w-[420px]">
          <article
            class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur"
          >
            <p class="text-sm uppercase tracking-[0.18em] text-slate-200/80">Best seller</p>
            <h2 class="mt-4 text-2xl font-semibold">Smart desk lamp</h2>
            <p class="mt-2 text-sm leading-6 text-slate-200/80">
              Brighten your workspace with adjustable color, phone charging, and a sleek matte
              finish.
            </p>
            <div class="mt-6 flex items-center gap-3 text-sm text-slate-100/90">
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                >✨</span
              >
              <span>Free delivery over $75</span>
            </div>
          </article>
          <article
            class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur"
          >
            <p class="text-sm uppercase tracking-[0.18em] text-slate-200/80">Fast delivery</p>
            <h2 class="mt-4 text-2xl font-semibold">Designed for your day</h2>
            <p class="mt-2 text-sm leading-6 text-slate-200/80">
              Curated products built for productivity, comfort, and everyday style.
            </p>
            <div class="mt-6 flex items-center gap-3 text-sm text-slate-100/90">
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                >🚚</span
              >
              <span>Next-day shipping available</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4">
      <div class="rounded-3xl bg-white p-8 shadow-sm shadow-slate-900/5">
        <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Trending categories
            </p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              Shop by collection
            </h2>
            <p class="mt-4 text-slate-600">
              Gear up for home, office, and active living with products picked to keep your routine
              moving.
            </p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-slate-200 p-6">
              <p class="text-3xl">💻</p>
              <h3 class="mt-4 text-lg font-semibold text-slate-900">Home Office</h3>
              <p class="mt-2 text-sm text-slate-500">
                Tools for focus, comfort, and workspace style.
              </p>
            </div>
            <div class="rounded-3xl border border-slate-200 p-6">
              <p class="text-3xl">🎧</p>
              <h3 class="mt-4 text-lg font-semibold text-slate-900">Audio & Wearables</h3>
              <p class="mt-2 text-sm text-slate-500">Headphones, earbuds, and smart accessories.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Featured products
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Picked for you</h2>
        </div>
        <RouterLink
          class="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          :to="{ name: 'productList' }"
        >
          View all products →
        </RouterLink>
      </div>

      <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-if="store.loading"
          class="col-span-full rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm"
        >
          Loading featured products...
        </div>
        <div
          v-if="store.error"
          class="col-span-full rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
        >
          Error loading products: {{ store.error }}
        </div>
        <article
          v-for="product in featuredProducts"
          :key="product.id"
          class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="h-56 w-full object-contain bg-slate-100 p-6"
          />
          <div class="space-y-3 p-6">
            <p class="text-xs uppercase tracking-[0.2em] text-indigo-600">{{ product.category }}</p>
            <h3 class="text-lg font-semibold text-slate-900">{{ product.title }}</h3>
            <p class="text-sm leading-6 text-slate-600 line-clamp-3">{{ product.description }}</p>
            <div class="flex items-center justify-between pt-3">
              <span class="text-xl font-semibold text-slate-900"
                >${{ product.price.toFixed(2) }}</span
              >
              <button
                @click="addToCart(product)"
                class="rounded-full px-4 py-2 text-sm font-medium transition duration-200 shadow-sm"
                :class="
                  addedItems.has(product.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5'
                "
              >
                {{ addedItems.has(product.id) ? 'Added! ✓' : 'Add to cart' }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 pb-20">
      <div class="grid gap-6 rounded-3xl bg-slate-900 p-10 text-white sm:grid-cols-3">
        <div class="space-y-3">
          <p class="text-sm uppercase tracking-[0.2em] text-indigo-300">Secure checkout</p>
          <h3 class="text-2xl font-semibold">Shop with confidence</h3>
          <p class="text-sm leading-6 text-slate-300">
            Your privacy and delivery are handled with care across every purchase.
          </p>
        </div>
        <div class="space-y-3">
          <h4 class="text-lg font-semibold">Free returns</h4>
          <p class="text-sm leading-6 text-slate-300">
            30-day returns on most orders, no questions asked.
          </p>
        </div>
        <div class="space-y-3">
          <h4 class="text-lg font-semibold">24/7 support</h4>
          <p class="text-sm leading-6 text-slate-300">
            Fast answers from our team whenever you need help.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
