<template>
    <div class="flex flex-col">
        <label v-if="labelId" :for="labelId" class="block mb-2">{{ label }}</label>
        <input type="file" :id="labelId" :class="{ 'input-error': error }"
            class="input w-full border-1 border-gray-300 p-2 rounded-md" @change="handleFileChange" />
        <div v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</div>
        <div v-if="fileName" class="mt-2 text-gray-700">{{ fileName }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults } from 'vue';
import { uploadFile } from '~/api/upload';

type Props = {
    labelId?: string;
    label?: string;
    error?: string;
};

const props = withDefaults(defineProps<Props>(), {});

const fileUrl = defineModel<string>()

const fileName = ref<string | null>(null);
const error = ref<string | null>(props.error || null);

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        fileName.value = target.files[0].name;
        error.value = null;

        const file = target.files[0];

        const response = await uploadFile(file)

        if (response.success && response.data) {
            fileUrl.value = response.data
        }
    } else {
        fileName.value = null;
        error.value = 'No file selected';
    }
};
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