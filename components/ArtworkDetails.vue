<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="md:flex">
      <div class="md:w-1/2 h-80 md:h-auto bg-gray-200">
        <NuxtImg
          v-if="artwork.image_id"
          provider="cloudinary"
          :src="artwork.image_id"
          preset="artwork"
          :alt="artwork.title"
          class="w-full h-full object-cover"
        />
        <ArtworkPlaceholder
          v-else
          :title="artwork.title"
          :artist="artwork.artist"
          :showArtist="true"
          aspectRatio="1/1"
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
            <slot name="tags"></slot>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-8">
          <slot name="cta"></slot>
        </div>
      </div>
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
