<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-serif mb-6">Artwork Management</h1>

    <!-- Header Actions -->
    <div class="flex justify-between items-center mb-8">
      <NuxtLink
        to="/admin/process"
        class="bg-gallery-secondary text-white px-4 py-2 rounded hover:bg-opacity-90"
      >
        Process New Artwork
      </NuxtLink>
    </div>

    <!-- Artworks Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Image
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Artist
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Category
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="artwork in artworks" :key="artwork.id">
            <td class="px-6 py-4">
              <div class="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                <img
                  v-if="artwork.image_path"
                  :src="artwork.image_path"
                  :alt="artwork.title"
                  class="h-full w-full object-cover"
                />
              </div>
            </td>
            <td class="px-6 py-4">{{ artwork.title }}</td>
            <td class="px-6 py-4">{{ artwork.artist }}</td>
            <td class="px-6 py-4 capitalize">{{ artwork.category }}</td>
            <td class="px-6 py-4">
              <NuxtLink
                :to="`/artwork/${artwork.id}`"
                class="text-gallery-secondary hover:underline mr-4"
              >
                View
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useGalleryStore } from "~/stores/gallery";

const galleryStore = useGalleryStore();
const artworks = computed(() => galleryStore.artworks);

onMounted(() => {
  if (!galleryStore.artworks.length) {
    galleryStore.fetchArtworks();
  }
});
</script>
