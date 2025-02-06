export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    preset: "node", // Keeps this preset for server-side deployment
  },

  buildDir: '.output', // Ensure the output directory is correctly configured
  app: {
    buildAssetsDir: '.output/public', // Vercel will expect the public assets in here
  },

  modules: [
    '@nuxt/ui',
    "@pinia/nuxt",
  ],
})
