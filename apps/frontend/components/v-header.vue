<template>
  <header class="p-4 flex items-center justify-between border-b-[1px] border-b-slate-500">
    <div class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M5.121 17.804A13.937 13.937 0 0112 16c1.474 0 2.946-.566 4.095-1.533L18.385 6h-.008a12.954 12.954 0 01-2.483-.186c1.857-.271 3.636-.542 5.423-.927a13.926 13.926 0 013.065 2.235c.54.447.808 1.08 1.006 1.73a13.926 13.926 0 01-2.235 3.065c-.482.236-.964.435-1.473.654C18.892 10.74 18.28 11.38 17.607 12c-.673.62-1.382 1.202-2.176 1.73a13.926 13.926 0 01-3.065-2.235c-.447-.54-1.08-.808-1.73-1.006a13.937 13.937 0 0112 16z" />
      </svg>
      <div class="text-xl">Hello, <span class="font-bold">{{ userEmail }}</span></div>
    </div>

    <div @click="logoutHandler" class="text-xl text-black cursor-pointer hover:text-red-600 transition duration-300">
      Logout
    </div>
  </header>
</template>

<script setup lang="ts">
const userStore = useAccountStore()

const userEmail = computed<string>(() => {
  if (userStore.user) {
    return userStore.user.email
  }

  return ""
})

const logoutHandler = () => {
  userStore.logout()
}
</script>

<style scoped>
header {
  background-color: #f7f7f7;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  cursor: pointer;
}

.header-right:hover {
  color: #dc3545;
}
</style>
