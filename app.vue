<template>
  <div id="app">
    <!-- Landing Page -->
    <section ref="landingPage" class="landing-page" @mousemove="updateGradient">
      <h1 ref="title" class="title">Mes dessins :]</h1>
      <p ref="introText" class="intro">Aled</p>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="100" 
        height="100" 
        fill="white" 
        ref="icon"
      >
        <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
      </svg>
    </section>

    <!-- Galerie d'Images -->
    <main>
      <section ref="gallery" class="gallery">
        <h2 class="section-title">Ma Galerie</h2>
        <div class="image-grid">
          <div
            v-for="i in 36"
            :key="i"
            class="image-item"
            ref="imageItem"
            @click="openModal(i)"
          >
            <img :src="`/images/dessin (${i}).jpg`" :alt="'Dessin ' + i" class="image" />
          </div>
        </div>
      </section>
    </main>

    <!-- Modale pour afficher l'image en grand -->
    <div v-if="isModalOpen" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="`/images/dessin (${selectedImage}).jpg`" :alt="'Dessin ' + selectedImage" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

const title = ref(null);
const introText = ref(null);
const gallery = ref(null);
const landingPage = ref(null);
const imageItem = ref([]);
const isModalOpen = ref(false); // État de la modale
const selectedImage = ref(null); // Image sélectionnée pour la modale
const squares = ref([]); // Pour stocker les carrés

// Fonction pour mettre à jour le gradient en fonction de la souris
const updateGradient = (event) => {
  const { clientX, clientY, currentTarget } = event;
  const { width, height } = currentTarget.getBoundingClientRect();
  
  const xPercent = (clientX / width) * 100; // Pourcentage horizontal
  const yPercent = (clientY / height) * 100; // Pourcentage vertical
  
  // Mise à jour du gradient dynamique avec des couleurs néon
  landingPage.value.style.background = `
    radial-gradient(
      circle at ${xPercent}% ${yPercent}%, 
      rgba(255, 20, 147, 0.8),  /* Rose foncé (néon) */
      rgba(0, 191, 255, 0.8)   /* Bleu clair (néon) */
    )
  `;
};

// Animation des carrés lors du scroll
onMounted(() => {
  const squareElements = document.querySelectorAll('.square');
  squares.value = squareElements;

  // Animation GSAP pour déplacer les carrés
  gsap.to(squares.value, {
    scrollTrigger: {
      trigger: gallery.value,
      start: "top bottom",
      end: "bottom top",
      scrub: 1, // Transition fluide avec le scroll
    },
    y: "+=100", // Déplacement vertical
    opacity: 0.5, // Opacité changeante
    duration: 2,
    ease: "power1.out",
  });

  // Animation des images dans la galerie
  imageItem.value.forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.5,  // Décalage pour chaque image
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  });
});

// Fonction pour ouvrir la modale et afficher l'image en grand
const openModal = (index) => {
  selectedImage.value = index;
  isModalOpen.value = true;
  gsap.fromTo(
    ".modal-content",
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
  );
};

// Fonction pour fermer la modale
const closeModal = () => {
  gsap.to(".modal-content", {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: "power3.in",
    onComplete: () => {
      isModalOpen.value = false;
    },
  });
};

const icon = ref(null);

onMounted(() => {
  // Animation de rebond avec couleurs néon
  gsap.to(icon.value, {
    y: -20,  // Se déplace de 20px vers le haut
    repeat: -1,  // Répète indéfiniment
    yoyo: true,  // Inverse l'animation (rebond)
    ease: "bounce.Out",  // Effet de rebond
    duration: 1,  // Durée de l'animation
    delay: 0.5,  // Décalage avant le démarrage de l'animation
    color: "rgba(0, 191, 255, 1)", // Icône en bleu clair (néon)
  });
});
</script>

<style scoped>
/* Styles globaux */
#app {
  font-family: "Poppins", sans-serif;
  color: #f5f5f5;
  text-align: center;
}

/* Landing Page */
.landing-page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(20, 20, 20, 0.9), rgba(20, 20, 20, 0.9)); /* Fond sombre */
  transition: background 0.2s ease;
}

.title {
  font-size: 7rem;
  font-weight: bold;
  color: rgba(0, 191, 255, 1); /* Bleu clair (néon) */
  margin-bottom: 20px;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.intro {
  font-size: 1.5rem;
  color: rgba(255, 20, 147, 1); /* Rose foncé (néon) */
  margin-bottom: 40px;
}

.enter-button {
  padding: 10px 30px;
  font-size: 1.2rem;
  background: #ff7eb3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.enter-button:hover {
  background: #ff3e7f;
}

/* Galerie */
.gallery {
  padding: 40px 20px;
  background: #121212; /* Fond sombre pour la galerie */
  position: relative;
}

.section-title {
  font-size: 4rem;
  margin-bottom: 20px;
  color: rgba(0, 191, 255, 1); /* Bleu clair (néon) */
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 images par ligne */
  gap: 50px; /* Espacement entre les images */
}

.image-item {
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Effet sur les images au survol */
.image-item:hover .image {
  transform: scale(1.1);
}

/* Carrés en dégradé */
.square {
  position: absolute;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, rgba(255, 20, 147, 0.8), rgba(0, 191, 255, 0.8));
  opacity: 0.8;
  animation: moveSquare 5s infinite ease-in-out;
}

@keyframes moveSquare {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100px, 100px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* Modale */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.modal-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
}

/* Fermeture de la modale */
.modal-content:hover {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1024px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 images par ligne sur tablette */
  }
  
  .title {
    font-size: 3rem;
  }

  .intro {
    font-size: 1.3rem;
  }

  .enter-button {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: 1fr; /* 1 image par ligne sur mobile */
  }

  .title {
    font-size: 2.5rem;
  }

  .intro {
    font-size: 1rem;
  }

  .enter-button {
    font-size: 0.9rem;
  }
}
</style>
