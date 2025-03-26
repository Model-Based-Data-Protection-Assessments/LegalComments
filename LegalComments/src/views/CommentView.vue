<template>
  <div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4">
    <h1 class="col-span-2 text-2xl font-bold">
      <span class="text-primary-500">#{{ comment.id }}</span> - {{ comment.legalTerm }}
    </h1>

    <div>Used in:</div>
    <div class="flex flex-col">
      <a v-for="[idx, link] of comment.usedIn.entries()" :key="idx" :href="link.to">{{
        link.text
      }}</a>
    </div>

    <p class="col-span-2">{{ comment.description }}</p>

    <div>Related Comments:</div>
    <div class="flex flex-col">
      <RouterLink
        v-for="[idx, commentId] of comment.relatedComments.entries()"
        :key="idx"
        :to="{
          name: 'comment',
          params: {
            id: commentId
          }
        }"
        class="text-blue-700 underline dark:text-blue-400"
      >
        #{{ commentId }} -
        {{ store().comments.find((comment) => comment.id === commentId)?.legalTerm }}
      </RouterLink>
    </div>

    <div>Based on:</div>
    <div class="flex flex-col">
      <a v-for="[idx, link] of comment.basedOn.entries()" :key="idx" :href="link.to">{{
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
import { RouterLink } from 'vue-router'

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
