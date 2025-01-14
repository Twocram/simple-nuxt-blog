<template>
    <div class="modal-wrapper absolute h-full w-full top-0 left-0" @click.self="emits('close')">
        <div
            class="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white max-w-[600px] w-full min-h-52 rounded-md">
            <div class="absolute right-4 top-4 cursor-pointer w-6 h-6 hover:text-gray-500" @click="emits('close')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <form class="flex flex-col gap-4 p-10" @submit.prevent="onSubmit">
                <UiVInput v-model="title" v-bind="titleAttrs" placeholder="Post title" :error="errors.title" />
                <UiVInput v-model="description" v-bind="descriptionAttrs" placeholder="Post description"
                    :error="errors.description" />
                <UiVFileInput v-model="fileUrl" label="Post image" label-id="post-image" />

                <UiVButton type="submit"
                    class="bg-blue-500 text-white border-none rounded-lg cursor-pointer hover:bg-blue-600">
                    Post
                </UiVButton>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod"
import { createPost } from "~/api/post";

const userStore = useAccountStore();

const emits = defineEmits(['close'])

const schema = z.object({
    title: z.string(),
    description: z.string(),
})


const { handleSubmit, defineField, errors } = useForm({
    validationSchema: toTypedSchema(schema)
})

const fileUrl = ref<string>("")

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit(async () => {
    const response = await createPost({
        caption: title.value as string,
        description: description.value as string,
        image: fileUrl.value,
        userId: userStore.user!.id
    })

    if (response.success && response.data) {
        emits('close')
    }
})

</script>

<style scoped>
.modal-wrapper {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>