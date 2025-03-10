<template>
    <div class="artwork-placeholder" :style="style">
      <div class="text-center p-4">
        <slot>
          <div class="space-y-2">
            <div class="font-serif">{{ title || 'Artwork' }}</div>
            <div v-if="showArtist" class="text-sm opacity-70">{{ artist }}</div>
          </div>
        </slot>
      </div>
    </div>
  </template>

  <script setup>
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    },
    showArtist: {
      type: Boolean,
      default: false
    },
    aspectRatio: {
      type: String,
      default: '1/1' // Square by default
    },
    color: {
      type: String,
      default: null
    }
  });

  // Generate a consistent color based on the title
  const getHashColor = (str) => {
    if (!str) return '#f3f4f6';

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }

    // Ensure it's not too dark or too light
    return color;
  };

  const style = computed(() => {
    const baseColor = props.color || getHashColor(props.title);

    return {
      aspectRatio: props.aspectRatio,
      background: `linear-gradient(135deg, ${baseColor}22, ${baseColor}44)`,
      color: `${baseColor}`,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  });
  </script>