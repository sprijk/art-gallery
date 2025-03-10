<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif text-gallery-primary mb-8">Kunstgalerie</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <FilterSidebar
          :categories="categories"
          :tags="allTags"
          :active-category="activeCategory"
          :active-tags="activeTags"
          :search-query="searchQuery"
          @update:search-query="setSearchQuery"
          @update:category="setCategory"
          @toggle:tag="toggleTag"
          @clear="clearFilters"
        />
      </div>

      <!-- Gallery Grid -->
      <div class="lg:col-span-3">
        <GalleryGrid :artworks="filteredArtworks" @clear="clearFilters" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGalleryStore } from "~/stores/gallery";
import { useRoute } from "vue-router";

const route = useRoute();
const galleryStore = useGalleryStore();

// Initialiseer met URL parameters indien aanwezig
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

// Computed properties van store
const categories = computed(() => galleryStore.categories);
const allTags = computed(() => galleryStore.allTags);
const filteredArtworks = computed(() => galleryStore.filteredArtworks);
const activeCategory = computed(() => galleryStore.activeCategory);
const activeTags = computed(() => galleryStore.activeTags);

// Reactieve zoekopdracht
const searchQuery = computed({
  get: () => galleryStore.searchQuery,
  set: (value) => galleryStore.setSearchQuery(value),
});

// Methoden
function setCategory(category) {
  galleryStore.setCategory(category);
}

function toggleTag(tag) {
  galleryStore.toggleTag(tag);
}

function clearFilters() {
  galleryStore.clearFilters();
}

function setSearchQuery(query) {
  galleryStore.setSearchQuery(query);
}
</script>
