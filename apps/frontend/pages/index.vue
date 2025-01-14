<template>
  <div class="flex flex-col mt-5">
    <div class="flex items-center self-center">
      <VInput v-model="postName" placeholder="Find post by title name" />
    </div>

    <div class="grid grid-cols-3">

    </div>
  </div>
</template>

<script setup lang="ts">
import { getAccount } from '~/api/account';
import VInput from '~/components/ui/v-input.vue';

const postName = ref<string>('')
const userStore = useUserStore()

const userAccount = await getAccount()

if (userAccount.data && userAccount.success) {
  userStore.setUser(userAccount.data)
}

</script>

<style scoped></style>
