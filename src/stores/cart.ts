import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Products } from '../types/products'

export interface CartItem {
  product: Products
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // Load from LocalStorage
  const savedCart = localStorage.getItem('trish_tech_cart')
  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart)
    } catch (e) {
      console.error('Failed to load cart from storage:', e)
    }
  }

  // Persist to LocalStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem('trish_tech_cart', JSON.stringify(newItems))
    },
    { deep: true }
  )

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
  })

  const freeShippingThreshold = 75
  const shippingCost = computed(() => {
    if (subtotal.value >= freeShippingThreshold || subtotal.value === 0) {
      return 0
    }
    return 5.99
  })

  const tax = computed(() => {
    return subtotal.value * 0.08
  })

  const total = computed(() => {
    return subtotal.value + shippingCost.value + tax.value
  })

  function addItem(product: Products) {
    const existing = items.value.find((item) => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeItem(productId: number) {
    const index = items.value.findIndex((item) => item.product.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find((item) => item.product.id === productId)
    if (item) {
      item.quantity = Math.max(0, quantity)
      if (item.quantity === 0) {
        removeItem(productId)
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    subtotal,
    freeShippingThreshold,
    shippingCost,
    tax,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})
