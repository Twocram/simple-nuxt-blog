<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h2 class="text-center text-3xl font-extrabold text-green-600">
        Sign Up
      </h2>

      <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            placeholder="Choose a username"
            class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter your email"
            class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Create a password"
            class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-green-500 px-4 py-3 text-white font-medium shadow-md hover:bg-green-600 focus:outline-none"
        >
          Sign Up
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <nuxt-link
          to="/auth/login"
          class="font-medium text-green-600 hover:underline"
        >
          Sign In
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

useHead({
  title: 'Sign Up',
});

const form = reactive({
  username: '',
  email: '',
  password: '',
});

const handleSubmit = () => {
  console.log('Sign Up', form);
};
</script>
