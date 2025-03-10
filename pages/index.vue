<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-96 md:h-[70vh] bg-gallery-dark overflow-hidden">
      <div class="absolute inset-0 opacity-60">
        <NuxtImg
          provider="cloudinary"
          src="samples/landscapes/girl-urban-view"
          width="1600"
          height="800"
          alt="Kunstgalerie hero afbeelding"
          class="w-full h-full object-cover"
        />
      </div>
      <div
        class="container mx-auto px-4 h-full flex items-center relative z-10"
      >
        <div class="max-w-2xl text-white">
          <h1 class="text-4xl md:text-6xl font-serif font-bold mb-4">
            Ontdek Prachtige Kunstwerken
          </h1>
          <p class="text-lg md:text-xl mb-8">
            Verken onze samengestelde collectie schilderijen van getalenteerde
            kunstenaars
          </p>
          <NuxtLink
            to="/gallery"
            class="inline-block bg-gallery-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded transition"
          >
            Bekijk Galerie
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Artworks -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-serif text-center mb-12">
        Uitgelichte Kunstwerken
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="artwork in featuredArtworks"
          :key="artwork.id"
          class="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
        >
          <NuxtLink
            :to="`/artwork/${artwork.id}`"
            class="block h-64 bg-gray-200 overflow-hidden"
          >
            <NuxtImg
              v-if="artwork.image_id"
              provider="cloudinary"
              :src="artwork.image_id"
              preset="thumbnail"
              :alt="artwork.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </NuxtLink>
          <div class="p-6">
            <h3 class="text-xl font-serif text-gallery-primary mb-2">
              {{ artwork.title }}
            </h3>
            <p class="text-sm text-gray-500 mb-3">
              {{ artwork.artist }} ({{ artwork.year }})
            </p>
            <p class="text-gray-700 mb-4 line-clamp-2">
              {{ artwork.description }}
            </p>
            <NuxtLink
              :to="`/artwork/${artwork.id}`"
              class="text-gallery-secondary hover:underline"
              >Bekijk Details</NuxtLink
            >
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <NuxtLink
          to="/gallery"
          class="inline-block border border-gallery-primary text-gallery-primary hover:bg-gallery-primary hover:text-white px-6 py-3 rounded transition"
        >
          Bekijk Alle Kunstwerken
        </NuxtLink>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif text-center mb-12">
          Blader per Categorie
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <NuxtLink
            v-for="category in categories.filter((c) => c !== 'all')"
            :key="category"
            :to="`/gallery?category=${category}`"
            class="bg-white rounded-lg p-6 text-center shadow hover:shadow-md transition"
          >
            <h3 class="text-xl capitalize">{{ category }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useGalleryStore } from "~/stores/gallery";

const galleryStore = useGalleryStore();
const categories = computed(() => galleryStore.categories);

// Haal 3 willekeurige kunstwerken op voor de uitgelichte sectie
const featuredArtworks = computed(() => {
  const shuffled = [...galleryStore.artworks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
});
</script>
