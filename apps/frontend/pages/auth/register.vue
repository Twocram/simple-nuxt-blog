<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="surface-card p-5 shadow-2 border-round w-96">
      <h2 class="text-center mb-4">Register</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <VInput
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
          <VInput
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
          <VInput
            v-model="passwordConfirm"
            v-bind="passwordConfirmAttrs"
            type="password"
            label-id="password-confirm"
            placeholder="Confirm your password"
            label="Confirm password"
            :error="errors.passwordConfirm"
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
        Already have account ?
        <NuxtLink to="/auth/login" class="text-blue-500">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { object, string } from 'zod';
import { register } from '~/api/auth';
import VButton from '~/components/ui/v-button.vue';
import VInput from '~/components/ui/v-input.vue';

definePageMeta({
  layout: 'auth',
});

const { handleSubmit, errors, setFieldError, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email('Invalid email'),
      password: string().min(6),
      passwordConfirm: string().min(6),
    })
  ),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm');

const onSubmit = handleSubmit(async () => {
  if (password.value !== passwordConfirm.value) {
    setFieldError('passwordConfirm', 'Passwords do not match');
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
});
</script>

<style scoped></style>
