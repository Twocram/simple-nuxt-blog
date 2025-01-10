<template>
  <div class="flex flex-col">
    <label v-if="labelId" :for="labelId" class="block mb-2">{{ label }}</label>
    <input
      v-model="modelValue"
      :type="type"
      :id="labelId"
      :class="{ 'input-error': error }"
      class="input w-full border-1 border-gray-300 p-2 border-round"
      :placeholder="placeholder"
    />
    <div v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
type InputType = 'email' | 'password' | 'text';

type Props = {
  type: InputType;
  labelId?: string;
  placeholder?: string;
  label?: string;
  error?: string;
};

defineProps<Props>();

const modelValue = defineModel();
</script>

<style scoped>
.input {
  border: 1px solid #cccbcb;
  transition: border-color 0.2s;
}

.input.input-error {
  border: 1px solid #dc3545;
}

.input:focus {
  border: 1px solid #007bff;
  outline: none;
}

.input-error:focus {
  border: 1px solid #dc3545;
}
</style>
