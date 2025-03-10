<!-- pages/artwork/[id].vue -->
<template>
  <div v-if="artwork" class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <NuxtLink
        to="/gallery"
        class="text-gallery-secondary hover:underline flex items-center gap-2"
      >
        <span>←</span> Terug naar Galerie
      </NuxtLink>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="md:flex">
        <!-- Artwork Image -->
        <div class="md:w-1/2 h-80 md:h-auto bg-gray-200">
          <NuxtImg
            v-if="artwork.image_id"
            provider="cloudinary"
            :src="artwork.image_id"
            preset="artwork"
            width="800"
            height="600"
            :alt="artwork.title"
            class="w-full h-full object-cover"
          />
          <ArtworkPlaceholder
            v-else
            :title="artwork.title"
            :artist="artwork.artist"
            :showArtist="true"
            aspectRatio="4/3"
          />
        </div>

        <!-- Artwork Details -->
        <div class="md:w-1/2 p-6 md:p-8">
          <h1 class="text-3xl font-serif text-gallery-primary mb-2">
            {{ artwork.title }}
          </h1>
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
            <button
              class="w-full bg-gallery-secondary text-white py-3 rounded hover:bg-opacity-90 transition"
            >
              Neem Contact Op Over Dit Kunstwerk
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Artworks -->
    <RelatedArtworks :artworks="relatedArtworks" />
  </div>

  <!-- Not Found -->
  <div v-else class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-3xl font-serif text-gallery-primary mb-4">
      Kunstwerk Niet Gevonden
    </h1>
    <p class="text-gray-700 mb-8">
      Het kunstwerk dat je zoekt bestaat niet of is mogelijk verwijderd.
    </p>
    <NuxtLink
      to="/gallery"
      class="inline-block bg-gallery-secondary text-white px-6 py-3 rounded hover:bg-opacity-90 transition"
    >
      Terug naar Galerie
    </NuxtLink>
  </div>
</template>

<script setup>
import { useGalleryStore } from "~/stores/gallery";
import { useRoute } from "vue-router";

const route = useRoute();
const galleryStore = useGalleryStore();

// Haal kunstwerk op via ID uit URL parameter
const artworkId = parseInt(route.params.id);
const artwork = computed(() => galleryStore.getArtworkById(artworkId));

// Vind gerelateerde kunstwerken op basis van dezelfde categorie of gedeelde tags
const relatedArtworks = computed(() => {
  if (!artwork.value) return [];

  // Vind kunstwerken in dezelfde categorie of met overeenkomende tags
  const related = galleryStore.artworks.filter(
    (art) =>
      art.id !== artworkId &&
      (art.category === artwork.value.category ||
        art.tags.some((tag) => artwork.value.tags.includes(tag)))
  );

  // Sorteer op relevantie (aantal overeenkomende tags)
  related.sort((a, b) => {
    const aMatches = a.tags.filter((tag) =>
      artwork.value.tags.includes(tag)
    ).length;
    const bMatches = b.tags.filter((tag) =>
      artwork.value.tags.includes(tag)
    ).length;
    return bMatches - aMatches;
  });

  // Retourneer top 3 gerelateerde kunstwerken
  return related.slice(0, 3);
});
</script>
