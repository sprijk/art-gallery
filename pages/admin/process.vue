<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl mb-6">Process New Artworks</h1>

    <div v-if="ingressFiles.length === 0" class="text-gray-500">
      No files to process
    </div>

    <div
      v-for="file in ingressFiles"
      :key="file.name"
      class="mb-8 p-4 border rounded"
    >
      <img :src="file.path" class="max-w-md mb-4" />

      <form @submit.prevent="saveArtwork(file)">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>Title</label>
            <input
              v-model="forms[file.name].title"
              required
              class="border p-2 w-full"
            />
          </div>
          <div>
            <label>Artist</label>
            <input
              v-model="forms[file.name].artist"
              required
              class="border p-2 w-full"
            />
          </div>
          <div>
            <label>Year</label>
            <input
              v-model="forms[file.name].year"
              type="number"
              class="border p-2 w-full"
            />
          </div>
          <div>
            <label>Category</label>
            <input
              v-model="forms[file.name].category"
              class="border p-2 w-full"
            />
          </div>
          <div class="col-span-2">
            <label>Tags (comma separated)</label>
            <input
              v-model="forms[file.name].tagsInput"
              class="border p-2 w-full"
            />
          </div>
          <div>
            <label>Dimensions</label>
            <input
              v-model="forms[file.name].dimensions"
              class="border p-2 w-full"
            />
          </div>
          <div>
            <label>Medium</label>
            <input
              v-model="forms[file.name].medium"
              class="border p-2 w-full"
            />
          </div>
          <div class="col-span-2">
            <label>Description</label>
            <textarea
              v-model="forms[file.name].description"
              class="border p-2 w-full"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Artwork
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const ingressFiles = ref([]);
const forms = ref({});

async function loadIngressFiles() {
  const { files } = await $fetch("/api/admin/ingress");
  ingressFiles.value = files;
  files.forEach((file) => {
    forms.value[file.name] = {
      title: "",
      artist: "",
      year: null,
      category: "",
      tagsInput: "",
      dimensions: "",
      medium: "",
      description: "",
    };
  });
}

async function saveArtwork(file) {
  const form = forms.value[file.name];
  await $fetch("/api/admin/save-artwork", {
    method: "POST",
    body: {
      title: form.title,
      artist: form.artist,
      description: form.description,
      imagePath: `/images/artworks/${file.name}`,
      originalFilename: file.name,
      year: form.year,
      category: form.category,
      tags: form.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      dimensions: form.dimensions,
      medium: form.medium,
    },
  });

  await loadIngressFiles();
}

onMounted(() => {
  loadIngressFiles();
});
</script>
