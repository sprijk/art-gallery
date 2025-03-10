<!-- pages/artwork/[id].vue -->
<template>
    <div v-if="artwork" class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <NuxtLink to="/gallery" class="text-gallery-secondary hover:underline flex items-center gap-2">
          <span>←</span> Terug naar Galerie
        </NuxtLink>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <!-- Artwork Image -->
          <div class="md:w-1/2 h-80 md:h-auto bg-gray-200">
            <!-- Placeholder for artwork image -->
            <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 p-4">
              {{ artwork.title }}
            </div>
          </div>

          <!-- Artwork Details -->
          <div class="md:w-1/2 p-6 md:p-8">
            <h1 class="text-3xl font-serif text-gallery-primary mb-2">{{ artwork.title }}</h1>
            <p class="text-xl text-gray-700 mb-4">door {{ artwork.artist }}</p>

            <div class="mb-6">
              <p class="text-gray-700 mb-4">{{ artwork.description }}</p>

              <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div class="text-gray-600">Jaar:</div>
                <div>{{ artwork.year }}</div>

                <div class="text-gray-600">Categorie:</div>
                <div class="capitalize">{{ artwork.category }}</div>

                <div class="text-gray-600">Medium:</div>
                <div>{{ artwork.medium }}</div>

                <div class="text-gray-600">Afmetingen:</div>
                <div>{{ artwork.dimensions }}</div>
              </div>
            </div>

            <!-- Tags -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="tag in artwork.tags"
                  :key="tag"
                  :to="`/gallery?tag=${tag}`"
                  class="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm transition"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="mt-8">
              <button class="w-full bg-gallery-secondary text-white py-3 rounded hover:bg-opacity-90 transition">
                Neem Contact Op Over Dit Kunstwerk
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Artworks -->
      <div class="mt-12">
        <h2 class="text-2xl font-serif text-gallery-primary mb-6">Misschien Vind Je Dit Ook Leuk</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="relatedArt in relatedArtworks" :key="relatedArt.id" class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div class="h-48 bg-gray-200">
              <!-- Placeholder for artwork image -->
              <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                {{ relatedArt.title }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-serif text-gallery-primary mb-1">{{ relatedArt.title }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ relatedArt.artist }}</p>
              <NuxtLink :to="`/artwork/${relatedArt.id}`" class="text-sm text-gallery-secondary hover:underline">
                Bekijk Kunstwerk
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-3xl font-serif text-gallery-primary mb-4">Kunstwerk Niet Gevonden</h1>
      <p class="text-gray-700 mb-8">Het kunstwerk dat je zoekt bestaat niet of is mogelijk verwijderd.</p>
      <NuxtLink to="/gallery" class="inline-block bg-gallery-secondary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">
        Terug naar Galerie
      </NuxtLink>
    </div>
  </template>

  <script setup>
  import { useGalleryStore } from '~/stores/gallery';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const galleryStore = useGalleryStore();

  // Get artwork by ID from URL param
  const artworkId = parseInt(route.params.id);
  const artwork = computed(() => galleryStore.getArtworkById(artworkId));

  // Find related artworks based on same category or shared tags
  const relatedArtworks = computed(() => {
    if (!artwork.value) return [];

    // Find artworks in the same category or with matching tags
    const related = galleryStore.artworks.filter(art =>
      art.id !== artworkId &&
      (art.category === artwork.value.category ||
       art.tags.some(tag => artwork.value.tags.includes(tag)))
    );

    // Sort by relevance (number of matching tags)
    related.sort((a, b) => {
      const aMatches = a.tags.filter(tag => artwork.value.tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => artwork.value.tags.includes(tag)).length;
      return bMatches - aMatches;
    });

    // Return top 3 related artworks
    return related.slice(0, 3);
  });
  </script>