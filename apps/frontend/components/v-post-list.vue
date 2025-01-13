<template>
  <div class="grid grid-cols-1 gap-4">
    <VPostListItem v-for="post in posts" :key="post.id" :post />
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';
import VPostListItem from './v-post-list-item.vue';

type Props = {
  posts: Omit<Post, 'userId'>[];
};

defineProps<Props>();
</script>

<style scoped></style>
