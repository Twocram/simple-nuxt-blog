<template>
  <div class="flex flex-col mt-5">
    <div class="flex items-center self-center">
      <UiVInput v-model="postName" placeholder="Find post by title name" />
    </div>

    <div class="grid grid-cols-3 p-4" v-if="posts.length > 0">
      <VPostList :posts="posts" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { getAccount } from '~/api/account';
import { getPosts } from '~/api/post';
import type { Post } from '~/types/post';

useHead({
  title: 'Posts',
  meta: [
    {
      name: 'description',
      content: 'Posts page',
    }
  ]
})

const postName = ref<string>('')
const userStore = useUserStore()
const posts = ref<Omit<Post, 'userId'>[]>([])

onMounted(async () => {
  const userAccount = await getAccount()

  if (userAccount.data && userAccount.success) {
    userStore.setUser(userAccount.data)
  }

  const _posts = await getPosts()

  if (_posts.success && _posts.data) {
    posts.value = _posts.data
  }
})

</script>

<style scoped></style>
