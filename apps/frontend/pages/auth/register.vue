<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="surface-card p-5 shadow-2 border-round w-96">
      <h2 class="text-center mb-4">Register</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <VInput v-model="form.email" type="email" label-id="email" placeholder="Enter your email" label="Email" />
        </div>

        <div class="mb-4">
          <VInput v-model="form.password" type="password" label-id="password" placeholder="Enter your password" label="Password" />
        </div>

        <div class="mb-4">
          <VInput v-model="form.passwordConfirm" type="password" label-id="password-confirm" placeholder="Confirm your password" label="Confirm password" />
        </div>

        <VButton type="submit" class="bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600">
          Login
        </VButton>
      </form>

      <p class="text-center mt-4 text-sm">
        Already have account ? <NuxtLink to="/auth/login" class="text-blue-500">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VInput from "~/components/ui/v-input.vue";
import VButton from "~/components/ui/v-button.vue";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
}

const form = ref<FormValues>({
  email: "",
  password: "",
  passwordConfirm: "",
})

const onSubmit = async () => {
  console.log('hello world', form.value)
}
</script>

<style scoped>

</style>
