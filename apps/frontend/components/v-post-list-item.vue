<template>
  <div class="max-w-60 border overflow-hidden border-gray-600 rounded-md">
    <div class="w-full">
      <img :src="post.image" :alt="post.caption" />
    </div>

    <div class="p-4">
      <h2 class="text-lg font-bold mb-2">{{ post.caption }}</h2>
      <p class="text-gray-600">{{ post.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';

type Props = {
  post: Omit<Post, 'userId'>;
};

defineProps<Props>();
</script>

<style scoped></style>
