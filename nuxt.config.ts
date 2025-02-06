// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    preset: "node" // Ensure Nitro is set up correctly
  },

  modules: [
    
    '@nuxt/ui',
    "@pinia/nuxt"
  ],
})
