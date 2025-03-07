<template>
  <div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4">
    <h1 class="col-span-2 text-2xl font-bold">
      <span class="text-primary-500">#{{ comment.id }}</span> - {{ comment.name }}
    </h1>

    <p class="col-span-2">{{ comment.description }}</p>

    <div>Legal Norms:</div>
    <div class="flex flex-col">
      <a v-for="[idx, link] of comment.legalNorm.entries()" :key="idx" :href="link.to">{{
        link.text
      }}</a>
    </div>

    <div>References:</div>
    <div class="flex flex-col">
      <a v-for="[idx, link] of comment.references.entries()" :key="idx" :href="link.to">{{
        link.text
      }}</a>
    </div>

    <div>Constraint:</div>
    <div>{{ comment.constraint }}</div>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/stores'
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const id = computed(() => Number(props.id))

const comment = computed(() => store().comments.find((comment) => comment.id === id.value)!)
</script>

<style scoped>
@reference "../main.css";

a {
  @apply text-blue-700 underline dark:text-blue-400;
}
</style>
