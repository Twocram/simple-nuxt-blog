<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="surface-card p-5 shadow-2 border-round w-96">
      <h2 class="text-center mb-4">Register</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <UiVInput
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            label-id="email"
            placeholder="Enter your email"
            label="Email"
            :error="errors.email"
          />
        </div>

        <div class="mb-4">
          <UiVInput
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            label-id="password"
            placeholder="Enter your password"
            label="Password"
            :error="errors.password"
          />
        </div>

        <div class="mb-4">
          <UiVInput
            v-model="passwordConfirm"
            v-bind="passwordConfirmAttrs"
            type="password"
            label-id="password-confirm"
            placeholder="Confirm your password"
            label="Confirm password"
            :error="errors.passwordConfirm"
          />
        </div>

        <UiVButton
          type="submit"
          class="bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600"
        >
          Login
        </UiVButton>
      </form>

      <p class="text-center mt-4 text-sm">
        Already have account ?
        <NuxtLink to="/auth/login" class="text-blue-500">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { register } from '~/api/auth';

useHead({
  title: 'Register',
  meta: [
    {
      name: 'description',
      content: 'Register page',
    },
  ],
});

definePageMeta({
  layout: 'auth',
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  passwordConfirm: z.string(),
});

const { handleSubmit, errors, setErrors, defineField } = useForm({
  validationSchema: toTypedSchema(schema),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm');

const onSubmit = handleSubmit(async () => {
  if (password.value !== passwordConfirm.value) {
    setErrors({
      passwordConfirm: 'Passwords do not match',
    });
    return;
  }

  const { data } = await register({
    email: email.value as string,
    password: password.value as string,
  });

  if (data && data.success) {
    window.localStorage.setItem('token', data.data);
    navigateTo('/');
  }

  if (data && !data.success) {
    setErrors({
      email: data.data,
      password: data.data,
      passwordConfirm: data.data,
    });
  }
});
</script>

<style scoped></style>
