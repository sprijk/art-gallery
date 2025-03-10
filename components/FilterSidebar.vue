<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 class="text-xl font-serif mb-4 md:mb-0">Filters</h2>
        <button
          @click="$emit('clear')"
          class="text-sm text-gallery-secondary hover:underline"
        >
          Alle Filters Wissen
        </button>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Zoeken</label>
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
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
            @click="$emit('update:category', category)"
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
            v-for="tag in tags"
            :key="tag"
            @click="$emit('toggle:tag', tag)"
            class="px-3 py-1 rounded text-sm"
            :class="activeTags.includes(tag) ? 'bg-gallery-primary text-white' : 'bg-gray-100 hover:bg-gray-200'"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  defineProps({
    categories: {
      type: Array,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: String,
      required: true
    },
    activeTags: {
      type: Array,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    }
  });

  defineEmits(['update:searchQuery', 'update:category', 'toggle:tag', 'clear']);
  </script>
