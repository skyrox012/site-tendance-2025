<template>
  <div id="app">
    <header>
      <h1 ref="title" class="title">Mon Portfolio Artistique</h1>
      <p ref="introText" class="intro">Bienvenue sur mon portfolio ! Découvrez mes créations artistiques.</p>
    </header>

    <main>
      <section ref="gallery" class="gallery">
        <h2 class="section-title">Ma Galerie</h2>
         <div class="images">
          <img src="/images/dessin (1).jpg" alt="Drawing 1" class="image-item" />
          <img src="/images/dessin (2).jpg" alt="Drawing 2" class="image-item" />
          <img src="/images/dessin (3).jpg" alt="Drawing 3" class="image-item" />
          <img src="/images/dessin (4).jpg" alt="Drawing 1" class="image-item" />
          <img src="/images/dessin (5).jpg" alt="Drawing 2" class="image-item" />
          <img src="/images/dessin (6).jpg" alt="Drawing 3" class="image-item" />
          <img src="/images/dessin (7).jpg" alt="Drawing 1" class="image-item" />
          <img src="/images/dessin (8).jpg" alt="Drawing 2" class="image-item" />
          <img src="/images/dessin (9).jpg" alt="Drawing 3" class="image-item" />
           <img src="/images/dessin (10).jpg" alt="Drawing 3" class="image-item" />
        </div>
      </section>

      <section class="about">
        <h2 class="section-title">À propos de moi</h2>
        <p ref="aboutText" class="about-text">Je suis un artiste passionné par les dessins...</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const title = ref(null);
const introText = ref(null);
const gallery = ref(null);
const aboutText = ref(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  // Animation du titre d'intro
  $gsap.fromTo(title.value, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

  // Animation du texte d'intro
  $gsap.fromTo(introText.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

  // Animation des images dans la galerie
  $gsap.fromTo(gallery.value.querySelectorAll('.image-item'), {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2, // Espacement entre les animations
    ease: 'power2.out'
  });

  // Animation du texte "À propos"
  $gsap.fromTo(aboutText.value, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
});
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  padding: 40px;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.intro {
  font-size: 1.2rem;
  margin-top: 20px;
  color: #777;
}

.gallery {
  margin-top: 50px;
}

.images {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.image-item {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: scale(1.05); /* Effet zoom au survol */
}

.about {
  margin-top: 50px;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.about-text {
  font-size: 1.2rem;
  color: #555;
}
</style>
