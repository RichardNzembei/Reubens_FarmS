// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    preset: "node", // Keeps this preset for server-side deployment
  },


  modules: [
    
    '@nuxt/ui',
    "@pinia/nuxt"
  ],
})
