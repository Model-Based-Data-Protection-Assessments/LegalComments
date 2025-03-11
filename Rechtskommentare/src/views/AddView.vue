<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Add new Comment</h1>
    <p></p>
    <form
      class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4"
      @submit="
        (e: Event) => {
          e.preventDefault()
          addComment()
        }
      "
    >
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" name="name" placeholder="Name" />

      <label for="description">Description:</label>
      <textarea
        id="description"
        v-model="description"
        type="text"
        name="description"
        placeholder="Description"
      ></textarea>

      <label>Legal Norms:</label>
      <LinkManager v-model="legalNorm" />

      <label>References:</label>
      <LinkManager v-model="references" />

      <label for="constraint">Constraint:</label>
      <textarea
        id="constraint"
        v-model="constraint"
        name="constraint"
        placeholder="Constraint"
      ></textarea>

      <ButtonComponent :disabled="name == ''"> Add New Comment </ButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import LinkManager from '@/components/LinkManager.vue'
import type { Link } from '@/model'
import {
  buildCommentToText,
  gitHubUrl,
  repositoryOwner,
  repositoryName,
  label
} from '@/model/Parsing'
import { ref } from 'vue'

const name = ref('')
const description = ref('')
const legalNorm = ref<Link[]>([])
const references = ref<Link[]>([])
const constraint = ref('')

function addComment() {
  if (name.value == '') {
    return
  }

  openGitHub()
  /*
  name.value = ''
  description.value = ''
  legalNorm.value = []
  references.value = []
  constraint.value = ''*/
}

function openGitHub() {
  const comment = {
    id: -1,
    name: name.value,
    description: description.value,
    legalNorm: legalNorm.value,
    references: references.value.filter((r) => r.to != '' || r.text != ''),
    constraint: constraint.value
  }
  const url = `${gitHubUrl}/${repositoryOwner}/${repositoryName}/issues/new?labels=${label}&title=${name.value}&body=${buildCommentToText(comment)}`
  window.open(encodeURI(url).replace(/#/g, '%23'), '_blank')?.focus()
}
</script>

<style scoped>
@reference "../main.css";

input,
textarea {
  @apply rounded border border-black/50 px-2 py-1 outline-none dark:bg-gray-800;
}

input {
  @apply w-96;
}

textarea {
  @apply min-h-32 min-w-96;
}
</style>
