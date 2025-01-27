<template>
  <div ref="box" class="box">
    Hello GSAP!
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'; // Import des fonctions Vue Composition API

// Créer une référence pour cibler l'élément
const box = ref(null);

// Utiliser GSAP après le montage du DOM
onMounted(() => {
  // Accéder à GSAP via `useNuxtApp` si tu as configuré un plugin global
  const { $gsap } = useNuxtApp();

  // Lancer une animation simple
  $gsap.to(box.value, { 
    x: 200,        // Déplacer de 200px sur l'axe X
    rotation: 360, // Faire une rotation de 360°
    duration: 2,   // Durée de 2 secondes
    ease: "power1.inOut" // Appliquer une courbe d’animation
  });
});
</script>

<style scoped>
/* Un style simple pour mieux voir l'animation */
.box {
  width: 100px;
  height: 100px;
  background-color: coral;
  text-align: center;
  line-height: 100px;
  color: white;
  margin: 50px auto;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}
</style>
