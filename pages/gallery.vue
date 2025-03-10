<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-serif text-gallery-primary mb-8">Kunstgalerie</h1>

      <!-- Filters -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 class="text-xl font-serif mb-4 md:mb-0">Filters</h2>
          <button
            @click="clearFilters"
            class="text-sm text-gallery-secondary hover:underline"
          >
            Alle Filters Wissen
          </button>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Zoeken</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Zoek op titel, kunstenaar of beschrijving"
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gallery-secondary focus:border-transparent"
          />
        </div>

        <!-- Categories -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Categorieën</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="setCategory(category)"
              class="px-3 py-1 rounded text-sm capitalize"
              :class="activeCategory === category ? 'bg-gallery-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in allTags"
              :key="tag"
              @click="toggleTag(tag)"
              class="px-3 py-1 rounded text-sm"
              :class="activeTags.includes(tag) ? 'bg-gallery-primary text-white' : 'bg-gray-100 hover:bg-gray-200'"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      <div v-if="filteredArtworks.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="artwork in filteredArtworks" :key="artwork.id" class="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
          <div class="h-64 bg-gray-200 overflow-hidden">
            <!-- Placeholder for artwork image -->
            <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
              {{ artwork.title }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif text-gallery-primary mb-2">{{ artwork.title }}</h3>
            <p class="text-sm text-gray-500 mb-3">{{ artwork.artist }} ({{ artwork.year }})</p>
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
            <NuxtLink :to="`/artwork/${artwork.id}`" class="text-gallery-secondary hover:underline">View Details</NuxtLink>
          </div>
        </div>
      </div>

      <!-- No results -->
      <div v-else class="bg-white p-8 rounded-lg text-center">
        <p class="text-lg text-gray-700 mb-4">Geen kunstwerken gevonden die overeenkomen met je filters.</p>
        <button
          @click="clearFilters"
          class="text-gallery-secondary hover:underline"
        >
          Wis filters en probeer opnieuw
        </button>
      </div>
    </div>
  </template>

  <script setup>
  import { useGalleryStore } from '~/stores/gallery';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const galleryStore = useGalleryStore();

  // Initialize with URL params if present
  onMounted(() => {
    const { category, tag, search } = route.query;

    if (category && galleryStore.categories.includes(category)) {
      galleryStore.setCategory(category);
    }

    if (tag && galleryStore.allTags.includes(tag)) {
      galleryStore.toggleTag(tag);
    }

    if (search) {
      galleryStore.setSearchQuery(search);
    }
  });

  // Computed properties from store
  const categories = computed(() => galleryStore.categories);
  const allTags = computed(() => galleryStore.allTags);
  const filteredArtworks = computed(() => galleryStore.filteredArtworks);
  const activeCategory = computed(() => galleryStore.activeCategory);
  const activeTags = computed(() => galleryStore.activeTags);

  // Reactive search query
  const searchQuery = computed({
    get: () => galleryStore.searchQuery,
    set: (value) => galleryStore.setSearchQuery(value)
  });

  // Methods
  function setCategory(category) {
    galleryStore.setCategory(category);
  }

  function toggleTag(tag) {
    galleryStore.toggleTag(tag);
  }

  function clearFilters() {
    galleryStore.clearFilters();
  }
  </script>