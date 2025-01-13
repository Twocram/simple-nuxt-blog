<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="surface-card p-5 shadow-2 border-round w-96">
      <h2 class="text-center mb-4">Login</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <VInput v-model="email" v-bind="emailAttrs" type="text" label-id="email" placeholder="Enter your email"
            label="Email" :error="errors.email" />
        </div>

        <div class="mb-4">
          <VInput v-model="password" type="password" v-bind="passwordAttrs" label-id="password"
            placeholder="Enter your password" label="Password" :error="errors.password" />
        </div>

        <VButton type="submit" class="bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600">
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
import { z } from 'zod';
import { login } from '~/api/auth';
import VButton from '~/components/ui/v-button.vue';
import VInput from '~/components/ui/v-input.vue';

useHead({
  title: "Login",
  meta: [
    {
      name: 'description',
      content: 'Login page',
    }
  ]
})

definePageMeta({
  layout: 'auth',
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const { handleSubmit, errors, defineField, setErrors } = useForm({
  validationSchema: toTypedSchema(
    schema
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

  if (data && !data.success) {
    setErrors({ email: data.data, password: data.data })
  }
});
</script>

<style scoped></style>
