/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Minimal shims for packages and local modules without type declarations
declare module '@tanstack/vue-query' {
  export const VueQueryPlugin: any
  export class QueryClient {
    constructor(options?: any)
  }
  export function useQuery(...args: any[]): any
  export function useMutation(...args: any[]): any
  export default any
}

declare module './router' {
  const router: any
  export default router
}
