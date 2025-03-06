<template>
  <div class="flex flex-col gap-4">
    <h1 class="font-bold text-2xl">Add new Comment</h1>
    <p></p>
    <form class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" name="name" placeholder="Name" />

      <label for="description">Description:</label>
      <textarea id="description" v-model="description" type="text" name="description" placeholder="Description"></textarea>

      <label>Legal Norms:</label>
      <LinkManager v-model="legalNorm" />

      <label>References:</label>
      <LinkManager v-model="references" />

      <label for="constraint">Constraint:</label>
      <textarea id="constraint" v-model="constraint" name="constraint" placeholder="Constraint"></textarea>

      <ButtonComponent :disabled="name == ''" @click="(e: Event) => {e.preventDefault(); addComment()}">
        Add New Comment
      </ButtonComponent>
    </form>   
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import LinkManager from '@/components/LinkManager.vue';
import type { Link } from '@/model';
import { store } from '@/stores';
import { ref } from 'vue';

const name = ref('')
const description = ref('')
const legalNorm = ref<Link[]>([])
const references = ref<Link[]>([])
const constraint = ref('')

function addComment() {
  store().comments.push({
    id: store().comments.map(c => c.id).reduce((a, b) => Math.max(a, b), 0) + 1,  
    name: name.value,
    description: description.value,
    legalNorm: legalNorm.value.filter(l => l.text != '') ,
    references: references.value.filter(r => r.text != ''),
    constraint: constraint.value
  })
  
  name.value = ''
  legalNorm.value = []
  references.value = []
  constraint.value = ''
}
</script>

<style scoped>
@reference "../main.css";

input, textarea {
  @apply rounded border border-black/50 dark:bg-gray-800 outline-none py-1 px-2;
}

input {
  @apply w-96
}

textarea {
  @apply min-w-96 min-h-32
}
</style>
