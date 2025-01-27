export default defineNuxtConfig({
  ssr: false, // Optionnel : Désactive le SSR si ton projet peut être rendu uniquement côté client
  plugins: [
    '~/plugins/gsap.client.js', // Déclare le plugin GSAP
  ],
  build: {
    transpile: ['gsap'], // Transpile GSAP pour éviter les erreurs de compatibilité
  },
});
