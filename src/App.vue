<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavigation from '@/components/TheNavigation.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <TheNavigation />

    <main class="mx-auto max-w-6xl px-4 py-10">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
