<template>
  <button class="w-full p-2 cursor-pointer">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonType = 'submit' | 'reset' | 'button';

type Props = {
  type?: ButtonType;
};

withDefaults(defineProps<Props>(), {
  type: 'button',
});
</script>

<style scoped></style>
