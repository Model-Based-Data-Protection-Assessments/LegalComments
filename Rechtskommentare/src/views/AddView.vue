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
      <input id="name" v-model="legalTerm" type="text" name="name" placeholder="Name" />

      <label>Used in:</label>
      <LinkManager v-model="usedIn" />

      <label for="description">Description:</label>
      <textarea
        id="description"
        v-model="description"
        type="text"
        name="description"
        placeholder="Description"
      ></textarea>

      <label>Related Comments:</label>
      <div class="w-fit">
        <input id="relatedInput" type="text" placeholder="Related Comment" />
        <div>
          <div v-for="r of relatedComments" :key="r" class="flex w-full gap-x-2">
            <span class="flex-1"
              >#{{ r }} - {{ store().comments.find((c) => c.id == r)?.legalTerm }}</span
            >
            <button @click="relatedComments.splice(relatedComments.indexOf(r), 1)">
              <FontAwesomeIcon :icon="faTrash" />
            </button>
          </div>
        </div>
      </div>

      <label>Based on:</label>
      <LinkManager v-model="basedOn" />

      <label>References:</label>
      <LinkManager v-model="references" />

      <label for="constraint">Constraint:</label>
      <textarea
        id="constraint"
        v-model="constraint"
        name="constraint"
        placeholder="Constraint"
      ></textarea>

      <ButtonComponent :disabled="legalTerm == ''"> Add New Comment </ButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import LinkManager from '@/components/LinkManager.vue'
import type { Comment, Link } from '@/model'
import {
  buildCommentToText,
  gitHubUrl,
  repositoryOwner,
  repositoryName,
  label
} from '@/model/Parsing'
import { store } from '@/stores'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue'
import autocomplete, { type AutocompleteItem } from 'autocompleter'
import { getLargestIssueNumber } from '@/model/Fetching'

const legalTerm = ref('')
const description = ref('')
const relatedComments = ref<number[]>([])
const usedIn = ref<Link[]>([])
const basedOn = ref<Link[]>([])
const references = ref<Link[]>([])
const constraint = ref('')

async function addComment() {
  if (legalTerm.value == '') {
    return
  }

  const comment = await buildComment()
  store().comments.push(comment)
  openGitHub(comment)
}

function openGitHub(comment: Comment) {
  const url = `${gitHubUrl}/${repositoryOwner}/${repositoryName}/issues/new?labels=${label}&title=${legalTerm.value}&body=${buildCommentToText(comment)}`
  window.open(encodeURI(url).replace(/#/g, '%23'), '_blank')?.focus()
}

async function buildComment() {
  const maxIssueId = await getLargestIssueNumber()
  const comment = {
    id: maxIssueId + 1,
    legalTerm: legalTerm.value,
    usedIn: usedIn.value.filter((l) => l.text !== '' || l.to !== ''),
    description: description.value,
    relatedComments: relatedComments.value,
    basedOn: basedOn.value.filter((l) => l.text !== '' || l.to !== ''),
    references: references.value.filter((l) => l.text !== '' || l.to !== ''),
    constraint: constraint.value
  }
  return comment
}

onMounted(() => {
  const input = document.getElementById('relatedInput') as HTMLInputElement | null
  if (!input) {
    return
  }
  autocomplete({
    input: input,
    fetch: function (text, update) {
      const lowText = text.toLowerCase()
      let num: string | undefined = undefined
      if (text.startsWith('#')) {
        num = text.substring(1)
      }
      const suggestions = store()
        .comments.filter(
          (c) =>
            c.legalTerm.toLowerCase().includes(lowText) || (num && c.id.toString().includes(num))
        )
        .map((c) => ({ label: `#${c.id} - ${c.legalTerm}`, value: c.id }))
      update(suggestions)
    },
    onSelect: function (item) {
      relatedComments.value.push((item as CommentAutoCompleteItem).value)
      input.value = ''
    },
    className:
      'bg-primary-100 dark:bg-primary-700 border:bg-primary-500 border border-t-0 rounded-b',
    render: function (item) {
      const itemElement = document.createElement('div')
      itemElement.textContent = item.label!
      itemElement.classList.add('autocomplete-item', 'px-2', 'cursor-pointer')
      return itemElement
    }
  })
})

interface CommentAutoCompleteItem extends AutocompleteItem {
  value: number
  label: string
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
