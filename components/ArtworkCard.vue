<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
  >
    <NuxtLink :to="`/artwork/${artwork.id}`">
      <div class="h-64 bg-gray-200 overflow-hidden">
        <NuxtImg
          v-if="artwork.image_id"
          :src="artwork.image_id"
          preset="artwork"
          :alt="artwork.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <ArtworkPlaceholder
          v-else
          :title="artwork.title"
          :artist="artwork.artist"
          :showArtist="true"
          aspectRatio="4/3"
        />
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
