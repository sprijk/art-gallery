<template>
    <div>
      <div v-if="artworks.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArtworkCard
          v-for="artwork in artworks"
          :key="artwork.id"
          :artwork="artwork"
        />
      </div>

      <!-- No results -->
      <div v-else class="bg-white p-8 rounded-lg text-center">
        <p class="text-lg text-gray-700 mb-4">Geen kunstwerken gevonden die overeenkomen met je filters.</p>
        <button
          @click="$emit('clear')"
          class="text-gallery-secondary hover:underline"
        >
          Wis filters en probeer opnieuw
        </button>
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

  defineEmits(['clear']);
  </script>