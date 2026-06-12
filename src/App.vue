<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

const mobileMenuOpen = ref(false)
const cartStore = useCartStore()
const productStore = useProductStore()
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header
      class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center justify-between gap-3 sm:w-auto">
          <div class="flex items-center gap-3">
            <div
              class="rounded-2xl bg-slate-900 px-3 py-2 text-white shadow-lg shadow-slate-900/10"
            >
              <p class="text-sm font-semibold">TrishTech</p>
            </div>
            <div class="hidden sm:block">
              <p class="text-sm font-semibold text-slate-900">Professional ecommerce experience</p>
            </div>
          </div>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 sm:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Open menu"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>

        <div class="flex flex-1 items-center gap-3 sm:justify-end">
          <div
            class="flex-1 min-w-0 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-600"
          >
            <label class="sr-only" for="search-products">Search products</label>
            <input
              id="search-products"
              v-model="productStore.searchTerm"
              type="search"
              placeholder="Search products"
              class="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div class="hidden items-center gap-3 sm:flex">
            <nav class="flex items-center gap-2">
              <RouterLink
                class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                :to="{ name: 'home' }"
              >
                Home
              </RouterLink>
              <RouterLink
                class="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                :to="{ name: 'productList' }"
              >
                Shop
              </RouterLink>
              <RouterLink
                class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                :to="{ name: 'cart' }"
                aria-label="View cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span
                  v-if="cartStore.totalItems > 0"
                  class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white"
                >
                  {{ cartStore.totalItems }}
                </span>
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="border-t border-slate-200 bg-white px-4 py-4 sm:hidden">
        <nav class="flex flex-col gap-3">
          <RouterLink
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            :to="{ name: 'home' }"
            @click="mobileMenuOpen = false"
          >
            Home
          </RouterLink>
          <RouterLink
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            :to="{ name: 'productList' }"
            @click="mobileMenuOpen = false"
          >
            Shop
          </RouterLink>
          <RouterLink
            class="relative flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            :to="{ name: 'cart' }"
            @click="mobileMenuOpen = false"
            aria-label="View cart"
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Cart</span>
            </div>
            <span
              v-if="cartStore.totalItems > 0"
              class="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-bold text-white"
            >
              {{ cartStore.totalItems }}
            </span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-10">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
