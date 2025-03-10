<template>
    <div class="min-h-screen bg-gallery-light">
      <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-6">
          <div class="flex justify-between items-center">
            <NuxtLink to="/" class="text-3xl font-serif text-gallery-primary font-bold">Kunstgalerie</NuxtLink>
            <nav class="hidden md:flex space-x-6">
              <NuxtLink to="/" class="text-gallery-dark hover:text-gallery-secondary transition">Home</NuxtLink>
              <NuxtLink to="/gallery" class="text-gallery-dark hover:text-gallery-secondary transition">Kunstwerken</NuxtLink>
              <NuxtLink to="/about" class="text-gallery-dark hover:text-gallery-secondary transition">Over Ons</NuxtLink>
            </nav>
            <button @click="mobileMenu = !mobileMenu" class="md:hidden text-gallery-primary">
              <span v-if="!mobileMenu">☰</span>
              <span v-else>&times;</span>
            </button>
          </div>
          <div v-if="mobileMenu" class="md:hidden mt-4 pb-4">
            <div class="flex flex-col space-y-4">
              <NuxtLink to="/" class="text-gallery-dark hover:text-gallery-secondary transition">Home</NuxtLink>
              <NuxtLink to="/gallery" class="text-gallery-dark hover:text-gallery-secondary transition">Kunstwerken</NuxtLink>
              <NuxtLink to="/about" class="text-gallery-dark hover:text-gallery-secondary transition">Over Ons</NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <main>
        <slot />
      </main>

      <footer class="bg-gallery-dark text-white mt-12">
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-xl font-serif mb-4">Kunstgalerie</h3>
              <p class="text-gray-300">Presentatie van prachtige kunstwerken van getalenteerde kunstenaars van over de hele wereld.</p>
            </div>
            <div>
              <h3 class="text-xl font-serif mb-4">Snelkoppelingen</h3>
              <ul class="space-y-2">
                <li><NuxtLink to="/" class="text-gray-300 hover:text-white transition">Home</NuxtLink></li>
                <li><NuxtLink to="/gallery" class="text-gray-300 hover:text-white transition">Kunstwerken</NuxtLink></li>
                <li><NuxtLink to="/about" class="text-gray-300 hover:text-white transition">Over Ons</NuxtLink></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-serif mb-4">Contact</h3>
              <p class="text-gray-300">Abonneer op onze nieuwsbrief voor updates over nieuwe exposities en uitgelichte kunstenaars.</p>
              <div class="mt-4 flex">
                <input type="email" placeholder="Uw e-mail" class="px-4 py-2 w-full text-black" />
                <button class="bg-gallery-secondary px-4 py-2 text-white hover:bg-opacity-90 transition">Abonneren</button>
              </div>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {{ new Date().getFullYear() }} Kunstgalerie. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>

  <script setup>
  const mobileMenu = ref(false);
  </script>
