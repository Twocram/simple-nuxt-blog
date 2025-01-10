<template>
  <div class="max-w-60 border-1 border-gray-300 rounded-md">
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
type Props = {
  post: any;
};

defineProps<Props>();
</script>

<style scoped></style>
