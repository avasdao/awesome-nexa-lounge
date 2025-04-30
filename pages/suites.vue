<script setup lang="ts">
useHead({
    title: `Private Suites — The Trilemma Lounge`,
    meta: [
        { name: 'description', content: `A Safu Space For Personas.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Private Suites
        </h1>

        <p>
            A safu space for your Personas to kick back and relax, in style.
        </p>

        <ol class="pl-10 list-decimal">
            <li>Create a NEW Persona</li>
        </ol>
    </main>
</template>
