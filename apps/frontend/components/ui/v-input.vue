<template>
  <label v-if="labelId" :for="labelId" class="block mb-2">{{ label }}</label>
  <input
    v-model="modelValue"
    :type="type"
    :id="labelId"
    class="input w-full border-1 border-gray-300 p-2 border-round"
    :placeholder="placeholder"
    :required="isRequired"
  />
</template>

<script setup lang="ts">
type InputType = 'email' | 'password' | 'text';

type Props = {
  type: InputType;
  labelId?: string;
  placeholder?: string;
  isRequired?: boolean;
  label?: string;
};

defineProps<Props>();

const modelValue = defineModel();
</script>

<style scoped>
.input {
  border: 1px solid #cccbcb;
  transition: border-color 0.2s;
}

.input:focus {
  border: 1px solid #007bff;
  outline: none;
}
</style>
