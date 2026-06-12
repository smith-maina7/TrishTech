import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Products } from '../types/products'

export const useProductStore = defineStore('product', () => {
  const product = ref<Products | null>(null)
  const products = ref<Products[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchTerm = ref('')

  async function fetchProduct(id?: number) {
    loading.value = true
    error.value = null
    try {
      const base = (import.meta.env.VITE_PRODUCTS_URL as string) || ''
      const url = id ? `${base}/${id}` : base
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText || 'Fetch error')
      const data = await res.json()
      if (id) product.value = data as Products
      else products.value = data as Products[]
      return data
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  function clear() {
    product.value = null
    products.value = []
    error.value = null
    loading.value = false
    searchTerm.value = ''
  }

  return { product, products, loading, error, searchTerm, fetchProduct, clear }
})
