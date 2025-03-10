<template>
    <div class="mt-12">
      <h2 class="text-2xl font-serif text-gallery-primary mb-6">Misschien Vind Je Dit Ook Leuk</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="artwork in artworks" :key="artwork.id" class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <NuxtLink :to="`/artwork/${artwork.id}`">
            <div class="h-48 bg-gray-200">
              <!-- Replace with actual image in production -->
              <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                {{ artwork.title }}
              </div>
            </div>
          </NuxtLink>
          <div class="p-4">
            <h3 class="text-lg font-serif text-gallery-primary mb-1">{{ artwork.title }}</h3>
            <p class="text-sm text-gray-500 mb-2">{{ artwork.artist }}</p>
            <NuxtLink :to="`/artwork/${artwork.id}`" class="text-sm text-gallery-secondary hover:underline">
              Bekijk Kunstwerk
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  defineProps({
    artworks: {
      type: Array,
      required: true
    }
  });
  </script>