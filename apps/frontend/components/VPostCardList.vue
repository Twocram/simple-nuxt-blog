<template>
  <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :image="post.image"
      :title="post.title"
      :date="post.date"
      :description="post.description"
    />
  </div>
</template>

<script setup lang="ts">
import PostCard from '~/components/PostCard.vue';

type Props = {
  posts: {
    id: number;
    image: string;
    title: string;
    date: string;
    description: string;
  }[];
};

defineProps<Props>();
</script>

<style scoped></style>
