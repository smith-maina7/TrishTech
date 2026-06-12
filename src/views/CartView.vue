<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// Promo code states
const promoInput = ref('')
const promoError = ref('')
const activeDiscount = ref(0) // percentage
const appliedPromoCode = ref('')

function applyPromoCode() {
  promoError.value = ''
  const code = promoInput.value.trim().toUpperCase()

  if (!code) {
    promoError.value = 'Please enter a promo code.'
    return
  }

  if (code === 'TRISHTECH10' || code === 'SAVE10') {
    activeDiscount.value = 0.1 // 10% discount
    appliedPromoCode.value = code
    promoInput.value = ''
  } else if (code === 'WELCOME20') {
    activeDiscount.value = 0.2 // 20% discount
    appliedPromoCode.value = code
    promoInput.value = ''
  } else {
    promoError.value = 'Invalid code. Try "SAVE10" or "WELCOME20".'
  }
}

function removePromoCode() {
  activeDiscount.value = 0
  appliedPromoCode.value = ''
}

// Discount calculation
const discountAmount = computed(() => {
  return cartStore.subtotal * activeDiscount.value
})

const finalTotal = computed(() => {
  const baseTotal =
    cartStore.subtotal - discountAmount.value + cartStore.shippingCost + cartStore.tax
  return Math.max(0, baseTotal)
})

// Progress to free shipping
const progressToFreeShipping = computed(() => {
  if (cartStore.subtotal >= cartStore.freeShippingThreshold) {
    return 100
  }
  return (cartStore.subtotal / cartStore.freeShippingThreshold) * 100
})

const remainingForFreeShipping = computed(() => {
  return Math.max(0, cartStore.freeShippingThreshold - cartStore.subtotal)
})

// Checkout state
const isCheckingOut = ref(false)
const orderCompleted = ref(false)
const orderId = ref('')

function triggerCheckout() {
  isCheckingOut.value = true
  setTimeout(() => {
    isCheckingOut.value = false
    orderCompleted.value = true
    orderId.value = 'TT-' + Math.floor(100000 + Math.random() * 900000)
    cartStore.clearCart()
    removePromoCode()
  }, 1500)
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-6">
    <!-- Success checkout modal -->
    <div
      v-if="orderCompleted"
      class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg max-w-xl mx-auto my-12"
    >
      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl"
      >
        ✓
      </div>
      <h1 class="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
        Thank you for your order!
      </h1>
      <p class="mt-2 text-slate-600">Your order is being processed and will ship soon.</p>

      <div class="mt-6 rounded-2xl bg-slate-50 p-6 text-left">
        <div
          class="flex justify-between border-b border-slate-200 pb-3 text-sm font-medium text-slate-900"
        >
          <span>Order Number:</span>
          <span class="font-mono text-indigo-600 font-semibold">{{ orderId }}</span>
        </div>
        <div class="mt-3 flex justify-between text-sm text-slate-500">
          <span>Estimated Delivery:</span>
          <span class="font-medium text-slate-700">3-5 Business Days</span>
        </div>
        <div class="mt-1 flex justify-between text-sm text-slate-500">
          <span>Shipping Provider:</span>
          <span class="font-medium text-slate-700">TrishTech Premium Logistics</span>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <RouterLink
          :to="{ name: 'productList' }"
          @click="orderCompleted = false"
          class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Continue Shopping
        </RouterLink>
        <RouterLink
          :to="{ name: 'home' }"
          @click="orderCompleted = false"
          class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Home
        </RouterLink>
      </div>
    </div>

    <!-- Active Cart Page -->
    <div v-else>
      <div class="mb-8">
        <h1 class="text-3xl font-semibold tracking-tight text-slate-900">Your Cart</h1>
        <p class="mt-2 text-sm text-slate-500" v-if="cartStore.items.length">
          Review your selection and proceed to secure checkout.
        </p>
      </div>

      <!-- Empty Cart State -->
      <div
        v-if="!cartStore.items.length"
        class="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm max-w-2xl mx-auto"
      >
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400 text-4xl mb-6"
        >
          🛒
        </div>
        <h2 class="text-2xl font-semibold text-slate-900">Your cart is empty</h2>
        <p class="mt-3 text-slate-500 max-w-md mx-auto">
          Explore our collection of beautiful tech items and office accessories to find exactly what
          you need.
        </p>
        <div class="mt-8">
          <RouterLink
            :to="{ name: 'productList' }"
            class="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Start Shopping
          </RouterLink>
        </div>
      </div>

      <!-- Main Columns -->
      <div v-else class="grid gap-6 lg:grid-cols-3">
        <!-- Cart Items List (Left 2 columns) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Free Shipping Progress Tracker -->
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex items-center justify-between text-sm">
              <span
                v-if="cartStore.subtotal >= cartStore.freeShippingThreshold"
                class="font-medium text-emerald-600"
              >
                🎉 Congratulations! You have earned <strong>Free Shipping</strong>!
              </span>
              <span v-else class="text-slate-600">
                You are only
                <strong class="text-slate-900">${{ remainingForFreeShipping.toFixed(2) }}</strong>
                away from free shipping.
              </span>
              <span class="text-xs font-semibold text-slate-500"
                >${{ cartStore.subtotal.toFixed(2) }} / ${{ cartStore.freeShippingThreshold }}</span
              >
            </div>
            <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                :style="{ width: `${progressToFreeShipping}%` }"
              ></div>
            </div>
          </div>

          <!-- Items list -->
          <div class="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <ul class="divide-y divide-slate-100">
              <li
                v-for="item in cartStore.items"
                :key="item.product.id"
                class="flex flex-col p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <!-- Product info -->
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 p-2 border border-slate-100"
                  >
                    <img
                      :src="item.product.image"
                      :alt="item.product.title"
                      class="h-full w-full object-contain"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {{ item.product.category }}
                    </p>
                    <h3 class="mt-1 text-base font-semibold text-slate-900 truncate">
                      {{ item.product.title }}
                    </h3>
                    <p class="mt-1 text-sm text-slate-500">
                      ${{ item.product.price.toFixed(2) }} each
                    </p>
                  </div>
                </div>

                <!-- Quantity & Price controls -->
                <div
                  class="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 border-t sm:border-t-0 pt-4 sm:pt-0"
                >
                  <!-- Quantity adjuster -->
                  <div
                    class="flex items-center border border-slate-200 rounded-full bg-slate-50 p-1"
                  >
                    <button
                      @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                      class="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-slate-800 transition"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span class="w-8 text-center text-sm font-semibold text-slate-800">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                      class="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-slate-800 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <!-- Item Total Price -->
                  <div class="w-20 text-right">
                    <span class="text-base font-bold text-slate-900"
                      >${{ (item.product.price * item.quantity).toFixed(2) }}</span
                    >
                  </div>

                  <!-- Trash icon -->
                  <button
                    @click="cartStore.removeItem(item.product.id)"
                    class="text-slate-400 hover:text-red-500 transition p-1"
                    aria-label="Delete item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>

            <!-- Clear Cart Option -->
            <div
              class="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100 text-sm"
            >
              <span class="text-slate-500">Items are saved automatically.</span>
              <button
                @click="cartStore.clearCart"
                class="text-sm font-medium text-red-600 hover:text-red-500 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Checkout Summary Column (Right 1 column) -->
        <div class="space-y-4">
          <div
            class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 sticky top-20"
          >
            <h2 class="text-lg font-semibold text-slate-900">Order Summary</h2>

            <!-- Calculations list -->
            <div class="space-y-4 text-sm border-b border-slate-100 pb-4">
              <div class="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span class="font-medium text-slate-900">${{ cartStore.subtotal.toFixed(2) }}</span>
              </div>

              <!-- Promo Code row if applied -->
              <div
                v-if="appliedPromoCode"
                class="flex justify-between text-emerald-600 font-medium"
              >
                <span class="flex items-center gap-1.5">
                  🏷️ Discount ({{ appliedPromoCode }})
                  <button @click="removePromoCode" class="text-[10px] text-red-500 hover:underline">
                    Remove
                  </button>
                </span>
                <span>-${{ discountAmount.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span v-if="cartStore.shippingCost === 0" class="font-medium text-emerald-600"
                  >FREE</span
                >
                <span v-else class="font-medium text-slate-900"
                  >${{ cartStore.shippingCost.toFixed(2) }}</span
                >
              </div>

              <div class="flex justify-between text-slate-600">
                <span>Estimated Taxes (8%)</span>
                <span class="font-medium text-slate-900">${{ cartStore.tax.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Grand Total -->
            <div class="flex justify-between items-baseline">
              <span class="text-base font-semibold text-slate-900">Total</span>
              <span class="text-2xl font-bold text-slate-900">${{ finalTotal.toFixed(2) }}</span>
            </div>

            <!-- Promo Code Input Form -->
            <div class="pt-4 border-t border-slate-100 space-y-2">
              <label
                for="promo-code"
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >Promo Code</label
              >
              <div class="flex gap-2">
                <input
                  id="promo-code"
                  v-model="promoInput"
                  type="text"
                  placeholder="e.g. SAVE10"
                  class="flex-1 min-w-0 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500 placeholder:text-slate-400 uppercase bg-slate-50"
                  @keydown.enter="applyPromoCode"
                />
                <button
                  @click="applyPromoCode"
                  class="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                >
                  Apply
                </button>
              </div>
              <p v-if="promoError" class="text-xs text-red-600 mt-1">{{ promoError }}</p>
              <p class="text-[11px] text-slate-400">
                Try code <strong>SAVE10</strong> (10% off) or <strong>WELCOME20</strong> (20% off)
              </p>
            </div>

            <!-- Checkout Action -->
            <button
              @click="triggerCheckout"
              :disabled="isCheckingOut"
              class="w-full flex justify-center items-center rounded-full bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 hover:-translate-y-0.5 transition active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <span
                v-if="isCheckingOut"
                class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white mr-2"
              ></span>
              {{ isCheckingOut ? 'Processing checkout...' : 'Proceed to Secure Checkout' }}
            </button>

            <!-- Checkout badges -->
            <div class="pt-4 border-t border-slate-100 space-y-3">
              <div class="flex items-center gap-3 text-xs text-slate-500">
                <span class="text-base">🔒</span>
                <span>Secure SSL encrypted payments & private checkout</span>
              </div>
              <!-- Simulated payment logos -->
              <div class="flex gap-2 justify-center pt-1 text-slate-300">
                <span
                  class="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50"
                  >Visa</span
                >
                <span
                  class="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50"
                  >Mastercard</span
                >
                <span
                  class="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50"
                  >Amex</span
                >
                <span
                  class="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50"
                  >Apple Pay</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
