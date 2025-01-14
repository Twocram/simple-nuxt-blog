<template>
  <div class="flex flex-col mt-5">
    <div class="flex items-center self-center">
      <UiVInput v-model="postName" placeholder="Find post by title name" />
    </div>

    <div class="grid grid-cols-3">

    </div>
  </div>
</template>

<script setup lang="ts">
import { getAccount } from '~/api/account';

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

onMounted(async () => {
  const userAccount = await getAccount()

  if (userAccount.data && userAccount.success) {
    userStore.setUser(userAccount.data)
  }
})

</script>

<style scoped></style>
