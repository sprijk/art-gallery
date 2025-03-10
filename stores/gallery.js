import { defineStore } from "pinia";

// Voorbeeld kunstwerkgegevens (in een echte app zou dit uit een API komen)
const sampleArtworks = [
  {
    id: 1,
    title: "Zonsondergang over de Velden",
    artist: "Emma van der Berg",
    year: 2023,
    description:
      "Een levendig landschap dat de gouden gloed van de Nederlandse velden bij zonsondergang vastlegt. Dit werk speelt met licht en schaduw om de serene schoonheid van het landelijke landschap te benadrukken.",
    category: "landscape",
    medium: "Olieverf op doek",
    dimensions: "80 x 60 cm",
    tags: ["landschap", "zonsondergang", "olieverf", "natuur"],
    image_id: "samples/landscapes/nature-mountains",
  },
  {
    id: 2,
    title: "Stedelijke Ritmiek",
    artist: "Lucas de Vries",
    year: 2022,
    description:
      "Een abstract werk dat de energie en het ritme van het stadsleven verkent. Levendige kleuren en dynamische vormen creëren een visuele symfonie die de constante beweging en vitaliteit van de moderne stad weerspiegelt.",
    category: "abstract",
    medium: "Acryl op canvas",
    dimensions: "100 x 100 cm",
    tags: ["abstract", "stad", "modern", "kleurrijk"],
    image_id: "samples/imagecon-2014/city-at-night",
  },
  {
    id: 3,
    title: "Reflecties van Bewustzijn",
    artist: "Sophie Jansen",
    year: 2021,
    description:
      "Een surrealistische verkenning van het menselijk bewustzijn, waarin droomachtige landschappen en symbolische beelden samenkomen om de mysteries van de geest te onthullen. Het werk nodigt uit tot contemplatie en persoonlijke interpretatie.",
    category: "surrealism",
    medium: "Gemengde technieken",
    dimensions: "90 x 70 cm",
    tags: ["surrealistisch", "droomachtig", "symbolisch", "bewustzijn"],
    image_id: "samples/ecommerce/accessories-bag",
  },
  {
    id: 4,
    title: "De Stille Waarnemer",
    artist: "Thomas Bakker",
    year: 2023,
    description:
      "Een meeslepend portret dat de diepte en complexiteit van menselijke emoties verkent. De doordringende blik van het onderwerp creëert een gevoel van intimiteit en introspectie, waardoor de kijker wordt uitgenodigd om verder te kijken dan het oppervlak.",
    category: "portrait",
    medium: "Olieverf op hout",
    dimensions: "60 x 45 cm",
    tags: ["portret", "emotie", "klassiek", "olieverf"],
    image_id: "samples/people/jazz",
  },
  {
    id: 5,
    title: "Digitale Evolutie",
    artist: "Nina Visser",
    year: 2024,
    description:
      "Een hedendaags werk dat de integratie van technologie in ons dagelijks leven onderzoekt. Door digitale elementen te combineren met traditionele technieken, vormt dit stuk een commentaar op onze snel veranderende en steeds meer verbonden wereld.",
    category: "contemporary",
    medium: "Digitale kunst en acryl",
    dimensions: "110 x 80 cm",
    tags: ["hedendaags", "technologie", "digitaal", "modern"],
    image_id: "samples/food/spices",
  },
  {
    id: 6,
    title: "Golven van Herinnering",
    artist: "Erik Martens",
    year: 2022,
    description:
      "Een abstract zeelandschap dat de kijker meeneemt op een emotionele reis door golven van kleur en textuur. Het werk roept een gevoel van nostalgie op, als een herinnering aan een gekoesterde dag aan zee die langzaam vervaagt in de tijd.",
    category: "abstract",
    medium: "Acryl en textiel op canvas",
    dimensions: "120 x 90 cm",
    tags: ["abstract", "zee", "textuur", "blauw"],
    image_id: "samples/animals/three-dogs",
  },
];

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    artworks: [...sampleArtworks],
    categories: [
      "all",
      "landscape",
      "abstract",
      "surrealism",
      "portrait",
      "contemporary",
    ],
    allTags: [...new Set(sampleArtworks.flatMap((artwork) => artwork.tags))],
    activeCategory: "all",
    activeTags: [],
    searchQuery: "",
  }),

  getters: {
    filteredArtworks: (state) => {
      let filtered = [...state.artworks];

      // Filter op categorie
      if (state.activeCategory !== "all") {
        filtered = filtered.filter(
          (artwork) => artwork.category === state.activeCategory
        );
      }

      // Filter op tags
      if (state.activeTags.length > 0) {
        filtered = filtered.filter((artwork) =>
          state.activeTags.some((tag) => artwork.tags.includes(tag))
        );
      }

      // Filter op zoekopdracht
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
