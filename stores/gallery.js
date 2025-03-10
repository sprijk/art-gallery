import { defineStore } from "pinia";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    artworks: [],
    categories: [
      "all",
      "landscape",
      "abstract",
      "surrealism",
      "portrait",
      "contemporary",
    ],
    allTags: [],
    activeCategory: "all",
    activeTags: [],
    searchQuery: "",
  }),

  getters: {
    filteredArtworks: (state) => {
      let filtered = [...state.artworks];

      // Filter by category
      if (state.activeCategory !== "all") {
        filtered = filtered.filter(
          (artwork) => artwork.category === state.activeCategory
        );
      }

      // Filter by tags
      if (state.activeTags.length > 0) {
        filtered = filtered.filter((artwork) =>
          state.activeTags.some((tag) => artwork.tags.includes(tag))
        );
      }

      // Filter by search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (artwork) =>
            artwork.title.toLowerCase().includes(query) ||
            artwork.artist.toLowerCase().includes(query) ||
            artwork.description.toLowerCase().includes(query)
        );
      }

      return filtered;
    },

    getArtworkById: (state) => (id) => {
      return state.artworks.find((artwork) => artwork.id === parseInt(id));
    },
  },

  actions: {
    async fetchArtworks() {
      const response = await fetch("/api/artworks");
      const data = await response.json();
      this.artworks = data.artworks;
      this.allTags = [
        ...new Set(data.artworks.flatMap((artwork) => artwork.tags)),
      ];
    },

    async uploadArtwork(formData) {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      return response.json();
    },

    setCategory(category) {
      this.activeCategory = category;
    },

    toggleTag(tag) {
      const index = this.activeTags.indexOf(tag);
      if (index === -1) {
        this.activeTags.push(tag);
      } else {
        this.activeTags.splice(index, 1);
      }
    },

    clearFilters() {
      this.activeCategory = "all";
      this.activeTags = [];
      this.searchQuery = "";
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});
