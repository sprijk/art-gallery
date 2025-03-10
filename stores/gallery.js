import { defineStore } from 'pinia'

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        artworks: [
            {
                id: 1,
                title: 'Sunset over the Mountains',
                artist: 'Emily Chen',
                description: 'A serene landscape depicting the tranquil beauty of a mountain sunset.',
                image: '/images/artworks/sunset-mountains.jpg',
                year: 2021,
                category: 'landscape',
                tags: ['mountains', 'sunset', 'nature'],
                dimensions: '24" x 36"',
                medium: 'Oil on canvas'
            },
            {
                id: 2,
                title: 'Urban Rhythms',
                artist: 'Marcus Bennett',
                description: 'An abstract interpretation of city life and its dynamic patterns.',
                image: '/images/artworks/urban-rhythms.jpg',
                year: 2022,
                category: 'abstract',
                tags: ['city', 'geometric', 'modern'],
                dimensions: '30" x 30"',
                medium: 'Acrylic on canvas'
            },
            {
                id: 3,
                title: 'The Garden of Dreams',
                artist: 'Sofia Vasquez',
                description: 'A surrealist garden scene with fantastical elements and vibrant colors.',
                image: '/images/artworks/garden-dreams.jpg',
                year: 2020,
                category: 'surrealism',
                tags: ['garden', 'dreams', 'colorful'],
                dimensions: '36" x 48"',
                medium: 'Mixed media'
            },
            {
                id: 4,
                title: 'Coastal Memories',
                artist: 'Thomas Wright',
                description: 'A nostalgic seascape capturing the essence of summer days by the ocean.',
                image: '/images/artworks/coastal-memories.jpg',
                year: 2023,
                category: 'landscape',
                tags: ['ocean', 'beach', 'summer'],
                dimensions: '18" x 24"',
                medium: 'Watercolor'
            },
            {
                id: 5,
                title: 'Portrait of Silence',
                artist: 'Olivia Kim',
                description: 'A contemplative portrait exploring themes of introspection and solitude.',
                image: '/images/artworks/portrait-silence.jpg',
                year: 2022,
                category: 'portrait',
                tags: ['figure', 'emotions', 'minimalist'],
                dimensions: '20" x 24"',
                medium: 'Oil on canvas'
            },
            {
                id: 6,
                title: 'Geometric Harmony',
                artist: 'David Rodriguez',
                description: 'A balanced composition of geometric shapes creating a sense of order and peace.',
                image: '/images/artworks/geometric-harmony.jpg',
                year: 2021,
                category: 'abstract',
                tags: ['geometric', 'minimal', 'balance'],
                dimensions: '24" x 24"',
                medium: 'Acrylic on panel'
            },
            {
                id: 7,
                title: 'Autumn Whispers',
                artist: 'Hannah Lee',
                description: 'A rich tapestry of fall colors captured in a forest scene.',
                image: '/images/artworks/autumn-whispers.jpg',
                year: 2023,
                category: 'landscape',
                tags: ['autumn', 'forest', 'seasonal'],
                dimensions: '30" x 40"',
                medium: 'Oil on canvas'
            },
            {
                id: 8,
                title: 'Industrial Evolution',
                artist: 'Alex Morgan',
                description: 'A commentary on modern industry and its relationship with natural elements.',
                image: '/images/artworks/industrial-evolution.jpg',
                year: 2020,
                category: 'contemporary',
                tags: ['industrial', 'urban', 'mechanical'],
                dimensions: '36" x 36"',
                medium: 'Mixed media on metal'
            }
        ],
        categories: ['all', 'landscape', 'abstract', 'surrealism', 'portrait', 'contemporary'],
        allTags: ['mountains', 'sunset', 'nature', 'city', 'geometric', 'modern', 'garden', 'dreams',
            'colorful', 'ocean', 'beach', 'summer', 'figure', 'emotions', 'minimalist',
            'minimal', 'balance', 'autumn', 'forest', 'seasonal', 'industrial', 'urban', 'mechanical'],
        activeCategory: 'all',
        activeTags: [],
        searchQuery: ''
    }),

    getters: {
        filteredArtworks: (state) => {
            let filtered = [...state.artworks];

            // Filter by category
            if (state.activeCategory !== 'all') {
                filtered = filtered.filter(artwork => artwork.category === state.activeCategory);
            }

            // Filter by tags
            if (state.activeTags.length > 0) {
                filtered = filtered.filter(artwork =>
                    state.activeTags.some(tag => artwork.tags.includes(tag))
                );
            }

            // Filter by search query
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                filtered = filtered.filter(artwork =>
                    artwork.title.toLowerCase().includes(query) ||
                    artwork.artist.toLowerCase().includes(query) ||
                    artwork.description.toLowerCase().includes(query)
                );
            }

            return filtered;
        },

        getArtworkById: (state) => (id) => {
            return state.artworks.find(artwork => artwork.id === parseInt(id));
        }
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
            this.activeCategory = 'all';
            this.activeTags = [];
            this.searchQuery = '';
        },

        setSearchQuery(query) {
            this.searchQuery = query;
        }
    }
})