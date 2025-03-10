<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
  >
    <NuxtLink :to="`/artwork/${artwork.id}`">
      <div class="h-64 bg-gray-200 overflow-hidden">
        <img
          v-if="artwork.image_path"
          :src="artwork.image_path"
          :alt="artwork.title"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400"
        >
          {{ artwork.title }}
        </div>
      </div>
    </NuxtLink>
    <div class="p-6">
      <h3 class="text-xl font-serif text-gallery-primary mb-2">
        {{ artwork.title }}
      </h3>
      <p class="text-sm text-gray-500 mb-3">
        {{ artwork.artist }} ({{ artwork.year }})
      </p>
      <p class="text-gray-700 mb-4 line-clamp-2">{{ artwork.description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in artwork.tags"
          :key="tag"
          class="bg-gray-100 text-xs px-2 py-1 rounded"
        >
          {{ tag }}
        </span>
      </div>
      <NuxtLink
        :to="`/artwork/${artwork.id}`"
        class="text-gallery-secondary hover:underline"
      >
        Bekijk Details
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  artwork: {
    type: Object,
    required: true,
  },
});
</script>
