<!-- pages/about.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-serif text-gallery-primary mb-8 text-center">Over Onze Galerie</h1>

      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div class="md:flex flex-row-reverse">
          <!-- Image -->
          <div class="md:w-1/2 h-64 md:h-auto bg-gray-200">
            <!-- Placeholder for gallery image -->
            <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-8">
              <span class="text-gray-400 text-lg">Galerie Interieur</span>
            </div>
          </div>

          <!-- Content -->
          <div class="md:w-1/2 p-6 md:p-8">
            <h2 class="text-2xl font-serif text-gallery-primary mb-4">Onze Missie</h2>
            <p class="text-gray-700 mb-4">
              Opgericht in 2015, onze galerie is toegewijd aan het tentoonstellen van uitzonderlijke kunstwerken van zowel gevestigde als opkomende kunstenaars. Wij geloven in de kracht van kunst om te inspireren, uit te dagen en te transformeren.
            </p>
            <p class="text-gray-700">
              Onze missie is om een toegankelijke en boeiende ruimte te creëren waar kunstliefhebbers nieuwe talenten en perspectieven kunnen ontdekken, terwijl we kunstenaars een platform bieden om hun creatieve visie met de wereld te delen.
            </p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-serif text-gallery-primary mb-6 text-center">Ons Team</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span class="text-gray-400">Foto</span>
            </div>
            <h3 class="text-xl font-serif text-gallery-primary mb-1">Sarah Johnson</h3>
            <p class="text-gallery-secondary mb-3">Galerie Directeur</p>
            <p class="text-gray-700 text-sm">
              Met meer dan 15 jaar ervaring in de kunstwereld, brengt Sarah haar passie voor hedendaagse kunst en scherpe curatoriale blik naar onze galerie.
            </p>
          </div>

          <!-- Team Member 2 -->
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span class="text-gray-400">Foto</span>
            </div>
            <h3 class="text-xl font-serif text-gallery-primary mb-1">Michael Chen</h3>
            <p class="text-gallery-secondary mb-3">Curator</p>
            <p class="text-gray-700 text-sm">
              Michael is gespecialiseerd in het ontdekken van opkomende talenten en het creëren van doordachte, meeslepende tentoonstellingen die een verhaal vertellen.
            </p>
          </div>

          <!-- Team Member 3 -->
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span class="text-gray-400">Foto</span>
            </div>
            <h3 class="text-xl font-serif text-gallery-primary mb-1">Emma Rodriguez</h3>
            <p class="text-gallery-secondary mb-3">Kunstenaars Contact</p>
            <p class="text-gray-700 text-sm">
              Emma werkt nauw samen met onze kunstenaars, biedt ondersteuning en bouwt relaties op die helpen om uitzonderlijke kunstwerken naar onze galerie te brengen.
            </p>
          </div>
        </div>
      </section>

      <!-- Visit Us Section -->
      <section class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <!-- Map -->
          <div class="md:w-1/2 h-64 md:h-auto bg-gray-200">
            <!-- Placeholder for map image -->
            <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center p-8">
              <span class="text-gray-400 text-lg">Galerie Locatie Kaart</span>
            </div>
          </div>

          <!-- Visit Info -->
          <div class="md:w-1/2 p-6 md:p-8">
            <h2 class="text-2xl font-serif text-gallery-primary mb-4">Bezoek Ons</h2>

            <div class="mb-6">
              <h3 class="font-medium text-gallery-dark mb-2">Adres</h3>
              <p class="text-gray-700">
                123 Kunststraat<br>
                Creatieve Wijk<br>
                Amsterdam, 1012 AB
              </p>
            </div>

            <div class="mb-6">
              <h3 class="font-medium text-gallery-dark mb-2">Openingstijden</h3>
              <div class="grid grid-cols-2 gap-2 text-gray-700">
                <div>Maandag - Vrijdag:</div>
                <div>10:00 - 18:00</div>
                <div>Zaterdag:</div>
                <div>11:00 - 17:00</div>
                <div>Zondag:</div>
                <div>Gesloten</div>
              </div>
            </div>

            <div>
              <h3 class="font-medium text-gallery-dark mb-2">Contact</h3>
              <p class="text-gray-700">
                E-mail: info@kunstgalerie.nl<br>
                Telefoon: (020) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>

  <script setup>
  // No script needed for the About page
  </script>