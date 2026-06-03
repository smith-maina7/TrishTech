<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <p class="text-lg font-semibold">TrishTech</p>
          <p class="text-sm text-slate-500">Vue + TypeScript + Tailwind starter</p>
        </div>
        <nav class="flex gap-3">
          <RouterLink
            class="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            :to="{ name: 'home' }"
          >
            Home
          </RouterLink>
          <RouterLink
            class="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            :to="{ name: 'productList' }"
          >
            Products
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
