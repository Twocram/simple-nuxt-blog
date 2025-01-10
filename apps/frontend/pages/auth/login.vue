<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="surface-card p-5 shadow-2 border-round w-96">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <VInput
            v-model="email"
            v-bind="emailAttrs"
            type="text"
            label-id="email"
            placeholder="Enter your email"
            label="Email"
            :error="errors.email"
          />
        </div>

        <div class="mb-4">
          <VInput
            v-model="password"
            type="password"
            v-bind="passwordAttrs"
            label-id="password"
            placeholder="Enter your password"
            label="Password"
            :error="errors.password"
          />
        </div>

        <VButton
          type="submit"
          class="bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600"
        >
          Login
        </VButton>
      </form>

      <p class="text-center mt-4 text-sm">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="text-blue-500">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { object, string } from 'zod';
import { login } from '~/api/auth';
import VButton from '~/components/ui/v-button.vue';
import VInput from '~/components/ui/v-input.vue';

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email('Invalid email'),
      password: string().min(6),
    })
  ),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async () => {
  const { data } = await login({
    email: email.value as string,
    password: password.value as string,
  });

  if (data && data.success) {
    window.localStorage.setItem('token', data.data);
    navigateTo('/');
  }
});
</script>

<style scoped></style>
