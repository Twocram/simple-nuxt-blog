<template>
  <ModalVPostModal v-if="isOpenCreateModal" @close="closeModalHandler" />
  <div class="flex flex-col mt-5">
    <div class="flex items-center gap-3 self-center">
      <UiVInput class="w-full" v-model="postName" placeholder="Find post by title name" />
    </div>

    <div class="p-4">
      <div class="w-32 mb-2">
        <UiVButton @click="isOpenCreateModal = true"
          class="bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600">
          Create Post
        </UiVButton>
      </div>

      <div v-if="posts.length > 0">
        <VPostList :posts="posts" />
      </div>
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
const userStore = useAccountStore()
const posts = ref<Omit<Post, 'userId'>[]>([])

const isOpenCreateModal = ref<boolean>(false)

async function fetchPosts() {
  const _posts = await getPosts(postName.value)

  if (_posts.success && _posts.data) {
    posts.value = _posts.data
  }
}

onMounted(async () => {
  const userAccount = await getAccount()

  if (userAccount.data && userAccount.success) {
    userStore.setUser(userAccount.data)
  }

  await fetchPosts()
})

async function closeModalHandler() {
  isOpenCreateModal.value = false

  await fetchPosts()
}

watch(() => postName.value, async () => {
  await fetchPosts()
})

</script>

<style scoped></style>
