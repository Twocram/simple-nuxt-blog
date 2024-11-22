<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <h1 class="mb-8 text-center text-4xl font-bold text-green-600">Posts</h1>

      <div class="mb-8 flex justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search posts..."
          class="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
        />
      </div>

      <VPostCardList :posts />
    </div>
  </div>
</template>

<script setup>
import VPostCardList from '~/components/VPostCardList.vue';

const searchQuery = ref('');

const posts = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300',
    title: 'The Beauty of Nature',
    date: 'November 20, 2024',
    description:
      'Discover the wonders of the natural world with breathtaking views and serene landscapes.',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300',
    title: 'Technology Advancements',
    date: 'November 19, 2024',
    description:
      "Explore the latest innovations in technology and how they're changing the world.",
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300',
    title: 'Healthy Living Tips',
    date: 'November 18, 2024',
    description:
      'Learn how to live a healthier life with practical tips and expert advice.',
  },
];
</script>
