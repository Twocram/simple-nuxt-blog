<template>
  <div
    class="overflow-hidden rounded-lg bg-white shadow-lg transition hover:shadow-xl"
  >
    <img :src="image" :alt="title" class="h-48 w-full object-cover" />
    <div class="p-4">
      <h2 class="mb-2 text-lg font-bold text-gray-800">{{ title }}</h2>
      <p class="mb-4 text-sm text-gray-500">{{ date }}</p>
      <p class="text-gray-700">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  date: String,
  description: String,
});
</script>
